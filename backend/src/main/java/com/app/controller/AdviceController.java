package com.app.controller;

import com.app.dto.request.AdviceRequestDTO;
import com.app.repository.AdviceHistoryRepository;
import com.app.service.AdviceService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/advice")
public class AdviceController {

    @Autowired
    private AdviceService adviceService;

    @Autowired
    private AdviceHistoryRepository adviceHistoryRepository;

    @PostMapping
    public ResponseEntity<?> getAdvice(@Valid @RequestBody AdviceRequestDTO request) {

        try {
            String response = adviceService.generateAdvice(
                    request.getUserId(),
                    request.getProfile(),
                    request.getQuery()
            );

            return ResponseEntity.ok(Map.of("response", response));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE)
                    .body(Map.of("error", "AI service unavailable"));
        }

    }

    @GetMapping("/{userId}/history")
    public ResponseEntity<?> getAdviceHistory(
            @PathVariable Long userId
    ) {

        return ResponseEntity.ok(
                adviceHistoryRepository
                        .findByUserIdOrderByCreatedAtDesc(userId)
        );
    }

}

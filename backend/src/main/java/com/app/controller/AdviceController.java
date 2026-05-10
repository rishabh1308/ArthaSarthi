package com.app.controller;

import com.app.dto.request.AdviceRequestDTO;
import com.app.dto.response.ApiResponse;
import com.app.service.AdviceService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/advice")
public class AdviceController {

    @Autowired
    private AdviceService adviceService;

    @Operation(
            summary = "Generate AI advice",
            description = "Generates AI-powered financial advice"
    )
    @PostMapping
    public ResponseEntity<ApiResponse<String>>
    getAdvice(
            @Valid
            @RequestBody
            AdviceRequestDTO request
    ) {

        log.info(
                "POST /api/advice called for user {}",
                request.getUserId()
        );

        String response =
                adviceService.generateAdvice(
                        request.getUserId(),
                        request.getProfile(),
                        request.getQuery()
                );

        log.info(
                "AI advice generated successfully for user {}",
                request.getUserId()
        );

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Advice generated successfully",
                        response
                )
        );
    }

    @Operation(
            summary = "Get advice history",
            description = "Fetches AI advice history for a user"
    )
    @GetMapping("/{userId}/history")
    public ResponseEntity<ApiResponse<?>>
    getAdviceHistory(
            @PathVariable Long userId
    ) {

        log.info(
                "GET /api/advice/{}/history called",
                userId
        );

        var history =
                adviceService.getAdviceHistory(userId);

        log.info(
                "Advice history fetched successfully for user {}",
                userId
        );

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Advice history fetched successfully",
                        history
                )
        );
    }
}
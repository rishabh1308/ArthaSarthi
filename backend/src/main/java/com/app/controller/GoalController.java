package com.app.controller;

import com.app.dto.request.GoalRequestDTO;
import com.app.dto.response.GoalResponseDTO;
import com.app.service.GoalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users/{userId}/goals")
public class GoalController {

    @Autowired
    private GoalService goalService;

    @PostMapping
    public ResponseEntity<GoalResponseDTO> createGoal(
            @PathVariable Long userId,
            @RequestBody GoalRequestDTO request
    ) {

        return ResponseEntity.ok(
                goalService.createGoal(userId, request)
        );
    }

    @GetMapping
    public ResponseEntity<List<GoalResponseDTO>> getGoals(
            @PathVariable Long userId
    ) {

        return ResponseEntity.ok(
                goalService.getUserGoals(userId)
        );
    }
}
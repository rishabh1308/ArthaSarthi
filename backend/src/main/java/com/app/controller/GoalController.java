package com.app.controller;

import com.app.dto.request.GoalRequestDTO;
import com.app.dto.response.ApiResponse;
import com.app.dto.response.GoalResponseDTO;
import com.app.service.GoalService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/users/{userId}/goals")
public class GoalController {

    @Autowired
    private GoalService goalService;

    @Operation(
            summary = "Create goal",
            description = "Creates a new financial goal"
    )
    @PostMapping
    public ResponseEntity<ApiResponse<GoalResponseDTO>>
    createGoal(
            @PathVariable Long userId,
            @Valid
            @RequestBody GoalRequestDTO request
    ) {

        log.info(
                "POST /users/{}/goals called",
                userId
        );

        GoalResponseDTO response =
                goalService.createGoal(
                        userId,
                        request
                );

        log.info(
                "Goal created successfully for user {}",
                userId
        );

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Goal created successfully",
                        response
                )
        );
    }

    @Operation(
            summary = "Get user goals",
            description = "Fetches all financial goals of a user"
    )
    @GetMapping
    public ResponseEntity<
            ApiResponse<List<GoalResponseDTO>>
            > getGoals(
            @PathVariable Long userId
    ) {

        log.info(
                "GET /users/{}/goals called",
                userId
        );

        List<GoalResponseDTO> goals =
                goalService.getUserGoals(userId);

        log.info(
                "Goals fetched successfully for user {}",
                userId
        );

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Goals fetched successfully",
                        goals
                )
        );
    }
}
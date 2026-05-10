package com.app.controller;

import com.app.dto.response.AnalysisResponse;
import com.app.dto.response.ApiResponse;
import com.app.service.AnalysisService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Financial Analysis APIs")
@Slf4j
@RestController
@RequestMapping("/users/{userId}/analysis")
public class AnalysisController {

    @Autowired
    private AnalysisService analysisService;

    @Tag(name = "Financial Analysis APIs")
    @GetMapping
    public ResponseEntity<ApiResponse<AnalysisResponse>>
    analyse(
            @PathVariable("userId")
            Long userId
    ){

        log.info(
                "GET /users/{}/analysis called",
                userId
        );

        AnalysisResponse response =
                analysisService.analyse(userId);

        log.info(
                "Financial analysis completed successfully for user {}",
                userId
        );

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Financial analysis completed successfully",
                        response
                )
        );
    }
}
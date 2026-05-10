package com.app.controller;

import com.app.dto.AssetDTO;
import com.app.dto.response.ApiResponse;
import com.app.service.AnalysisService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/users/{userId}/assets")
public class AssetController {

    @Autowired
    private AnalysisService analysisService;

    @Operation(
            summary = "Get assets",
            description = "Returns categorized user assets"
    )
    @GetMapping
    public ResponseEntity<ApiResponse<List<AssetDTO>>>
    getAssets(
            @PathVariable Long userId
    ){

        log.info(
                "GET /users/{}/assets called",
                userId
        );

        List<AssetDTO> assets =
                analysisService.getUserAssets(userId);

        log.info(
                "Assets fetched successfully for user {}",
                userId
        );

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Assets fetched successfully",
                        assets
                )
        );
    }
}
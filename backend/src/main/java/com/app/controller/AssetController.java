package com.app.controller;


import com.app.dto.AssetDTO;
import com.app.service.AnalysisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/users/{userId}/assets")
public class AssetController {

    @Autowired
    private AnalysisService analysisService;

    @GetMapping
    public ResponseEntity<List<AssetDTO>> getAssets(@PathVariable Long userId){
        return ResponseEntity.ok(analysisService.getUserAssets(userId));
    }

}

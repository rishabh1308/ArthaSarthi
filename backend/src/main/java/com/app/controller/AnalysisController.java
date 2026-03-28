package com.app.controller;

import com.app.dto.AnalysisResponse;
import com.app.service.AnalysisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/analysis")
public class AnalysisController {

    @Autowired
    private AnalysisService analysisService;

    @GetMapping("/{userId}")
    public AnalysisResponse analyse(@PathVariable Long userId){
        return analysisService.analyse(userId);
    }
}

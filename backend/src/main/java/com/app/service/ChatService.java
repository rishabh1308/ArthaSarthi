package com.app.service;

import com.app.domain.entity.FinancialProfile;
import com.app.dto.FinancialProfileDTO;
import com.app.exceptions.ResourceNotFoundException;
import com.app.repository.FinancialProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class ChatService {

    @Autowired
    private FinancialProfileRepository financialProfileRepository;

    @Autowired
    private AnalysisService analysisService;

    @Autowired
    private RestTemplate restTemplate;

    @Value("${ai.service.url}")
    private String aiServiceUrl;

    public String chat(Long userId, String message){

        // Latest active Financial State retrieval
        FinancialProfile financialProfile = financialProfileRepository
                .findUserByUserIdAndIsActiveTrue(userId)
                .orElseThrow(()->new ResourceNotFoundException("Financial Profile not found"))
                ;

        //Converting to DTO
        FinancialProfileDTO dto = analysisService.mapToDTO(financialProfile);

        // Dynamic assets
        dto.setAssets(analysisService.buildAssets(userId));

        // Building request Body
        Map<String, Object> body = new HashMap<>();
        body.put("user_id", userId);
        body.put("message",  message);
        body.put("profile", dto);

        ResponseEntity<Map> response = restTemplate.postForEntity(aiServiceUrl, body, Map.class);

        if(response.getBody()==null|| response.getBody().get("response")==null){
            throw new RuntimeException("Invalid Response from AI Service");
        }

        return response.getBody().get("response").toString();// response mapping hence "response"

    }

}

package com.app.service;

import com.app.domain.entity.FinancialProfile;
import com.app.dto.response.FinancialProfileResponseDTO;
import com.app.exceptions.ResourceNotFoundException;
import com.app.repository.FinancialProfileRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@Service
public class ChatService {

    @Autowired
    private FinancialProfileRepository
            financialProfileRepository;

    @Autowired
    private AnalysisService analysisService;

    @Autowired
    private RestTemplate restTemplate;

    @Value("${ai.service.url}")
    private String aiServiceUrl;

    public String chat(
            Long userId,
            String message
    ){

        log.info(
                "Starting AI chat request for user {}",
                userId
        );

        // Latest active financial state retrieval
        FinancialProfile financialProfile =
                financialProfileRepository
                        .findUserByUserIdAndIsActiveTrue(
                                userId
                        )
                        .orElseThrow(() -> {

                            log.error(
                                    "Financial profile not found for user {}",
                                    userId
                            );

                            return new ResourceNotFoundException(
                                    "Financial Profile not found"
                            );
                        });

        log.debug(
                "Active financial profile fetched for user {}",
                userId
        );

        // Convert to DTO
        FinancialProfileResponseDTO dto =
                analysisService.mapToDTO(
                        financialProfile
                );

        // Build request body
        Map<String, Object> body =
                new HashMap<>();

        body.put("user_id", userId);

        body.put("message", message);

        body.put("profile", dto);

        log.info(
                "Calling AI service for user {}",
                userId
        );

        ResponseEntity<Map> response =
                restTemplate.postForEntity(
                        aiServiceUrl,
                        body,
                        Map.class
                );

        if(response.getBody() == null
                || response.getBody()
                .get("response") == null){

            log.error(
                    "Invalid response received from AI service for user {}",
                    userId
            );

            throw new RuntimeException(
                    "Invalid Response from AI Service"
            );
        }

        log.info(
                "AI response generated successfully for user {}",
                userId
        );

        return response.getBody()
                .get("response")
                .toString();
    }
}
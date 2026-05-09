package com.app.service;

import com.app.domain.entity.AdviceHistory;
import com.app.domain.entity.FinancialProfile;
import com.app.domain.entity.Goal;
import com.app.domain.entity.User;
import com.app.domain.enums.AdviceGeneratedBy;
import com.app.repository.AdviceHistoryRepository;
import com.app.repository.FinancialProfileRepository;
import com.app.repository.GoalRepository;
import com.app.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
public class AdviceService {

    @Autowired
    private AdviceHistoryRepository adviceHistoryRepository;

    @Autowired
    private FinancialProfileRepository financialProfileRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private GoalRepository goalRepository;

    private final RestTemplate restTemplate =
            new RestTemplate();

    @Value("${ai.service.url}")
    private String aiUrl;

    public String generateAdvice(
            Long userId,
            Map<String, Object> profile,
            String query
    ) {

        try {

            log.info(
                    "Generating AI advice for user {}",
                    userId
            );

            // Fetch goals automatically from DB
            List<Goal> userGoals =
                    goalRepository.findByUserId(userId);

            log.debug(
                    "Fetched {} goals for user {}",
                    userGoals.size(),
                    userId
            );

            // Convert goals into AI payload format
            List<Map<String, Object>> goalPayload =
                    userGoals.stream()
                            .map(goal -> {

                                Map<String, Object> g =
                                        new HashMap<>();

                                g.put(
                                        "goal_name",
                                        goal.getGoalName()
                                );

                                g.put(
                                        "target_amount",
                                        goal.getTargetAmount()
                                );

                                g.put(
                                        "current_amount",
                                        goal.getCurrentAmount()
                                );

                                g.put(
                                        "target_years",
                                        goal.getTargetYears()
                                );

                                g.put(
                                        "priority",
                                        goal.getPriority().name()
                                );

                                g.put(
                                        "status",
                                        goal.getStatus().name()
                                );

                                return g;
                            })
                            .toList();

            // Build AI request body
            Map<String, Object> request =
                    new HashMap<>();

            request.put("user_id", userId);

            request.put("message", query);

            request.put("profile", profile);

            request.put("goals", goalPayload);

            HttpHeaders headers = new HttpHeaders();

            headers.setContentType(
                    MediaType.APPLICATION_JSON
            );

            HttpEntity<Map<String, Object>> entity =
                    new HttpEntity<>(request, headers);

            log.info(
                    "Calling AI engine for user {}",
                    userId
            );

            // Call AI Engine
            ResponseEntity<Map> response =
                    restTemplate.exchange(
                            aiUrl,
                            HttpMethod.POST,
                            entity,
                            Map.class
                    );

            Map body = response.getBody();

            if (body == null) {

                log.warn(
                        "AI service returned empty response for user {}",
                        userId
                );

                return "AI service returned empty response";
            }

            // Extract AI response
            String aiResponse =
                    (String) body.getOrDefault(
                            "response",
                            "No advice generated"
                    );

            log.info(
                    "AI advice generated successfully for user {}",
                    userId
            );

            // Fetch user
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> {

                        log.error(
                                "User not found while saving advice history. User ID: {}",
                                userId
                        );

                        return new RuntimeException(
                                "User not found"
                        );
                    });

            // Fetch active financial profile
            FinancialProfile financialProfile =
                    financialProfileRepository
                            .findUserByUserIdAndIsActiveTrue(
                                    userId
                            )
                            .orElse(null);

            if (financialProfile == null) {

                log.warn(
                        "No active financial profile found for user {}",
                        userId
                );
            }

            // Create advice history
            AdviceHistory adviceHistory =
                    new AdviceHistory();

            adviceHistory.setUser(user);

            adviceHistory.setFinancialProfile(
                    financialProfile
            );

            adviceHistory.setGeneratedBy(
                    AdviceGeneratedBy.LLM
            );

            adviceHistory.setQuery(query);

            adviceHistory.setResponse(aiResponse);

            // Save advice history
            adviceHistoryRepository.save(
                    adviceHistory
            );

            log.info(
                    "Advice history saved successfully for user {}",
                    userId
            );

            return aiResponse;

        } catch (Exception e) {

            log.error(
                    "Failed to generate AI advice for user {}",
                    userId,
                    e
            );

            return "ERROR: " + e.getMessage();
        }
    }
}
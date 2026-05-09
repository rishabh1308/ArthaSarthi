package com.app.service;

import com.app.domain.entity.Goal;
import com.app.domain.entity.User;
import com.app.domain.enums.GoalStatus;
import com.app.dto.request.GoalRequestDTO;
import com.app.dto.response.GoalResponseDTO;
import com.app.repository.GoalRepository;
import com.app.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Slf4j
@Service
public class GoalService {

    @Autowired
    private GoalRepository goalRepository;

    @Autowired
    private UserRepository userRepository;

    public GoalResponseDTO createGoal(
            Long userId,
            GoalRequestDTO request
    ) {

        log.info(
                "Creating goal for user {}",
                userId
        );

        User user = userRepository.findById(userId)
                .orElseThrow(() -> {

                    log.error(
                            "User not found while creating goal. User ID: {}",
                            userId
                    );

                    return new RuntimeException(
                            "User not found"
                    );
                });

        Goal goal = new Goal();

        goal.setGoalName(
                request.getGoalName()
        );

        goal.setTargetAmount(
                request.getTargetAmount()
        );

        goal.setCurrentAmount(
                request.getCurrentAmount()
        );

        goal.setTargetYears(
                request.getTargetYears()
        );

        goal.setPriority(
                request.getPriority()
        );

        goal.setStatus(
                GoalStatus.ACTIVE
        );

        goal.setTargetDate(
                LocalDate.now()
                        .plusYears(
                                request.getTargetYears()
                        )
        );

        goal.setUser(user);

        Goal savedGoal =
                goalRepository.save(goal);

        log.info(
                "Goal '{}' created successfully for user {}",
                savedGoal.getGoalName(),
                userId
        );

        return mapToDTO(savedGoal);
    }

    public List<GoalResponseDTO> getUserGoals(
            Long userId
    ) {

        log.info(
                "Fetching goals for user {}",
                userId
        );

        List<GoalResponseDTO> goals =
                goalRepository.findByUserId(userId)
                        .stream()
                        .map(this::mapToDTO)
                        .toList();

        log.debug(
                "Fetched {} goals for user {}",
                goals.size(),
                userId
        );

        return goals;
    }

    private GoalResponseDTO mapToDTO(
            Goal goal
    ) {

        log.debug(
                "Mapping goal '{}' to DTO",
                goal.getGoalName()
        );

        return new GoalResponseDTO(
                goal.getId(),
                goal.getGoalName(),
                goal.getTargetAmount(),
                goal.getCurrentAmount(),
                goal.getTargetYears(),
                goal.getPriority(),
                goal.getStatus()
        );
    }
}
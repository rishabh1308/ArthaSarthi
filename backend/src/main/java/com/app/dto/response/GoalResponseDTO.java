package com.app.dto.response;

import com.app.domain.enums.GoalPriority;
import com.app.domain.enums.GoalStatus;

public class GoalResponseDTO {

    private Long id;

    private String goalName;

    private Double targetAmount;

    private Double currentAmount;

    private Integer targetYears;

    private GoalPriority priority;

    private GoalStatus status;

    public GoalResponseDTO() {
    }

    public GoalResponseDTO(
            Long id,
            String goalName,
            Double targetAmount,
            Double currentAmount,
            Integer targetYears,
            GoalPriority priority,
            GoalStatus status
    ) {
        this.id = id;
        this.goalName = goalName;
        this.targetAmount = targetAmount;
        this.currentAmount = currentAmount;
        this.targetYears = targetYears;
        this.priority = priority;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public String getGoalName() {
        return goalName;
    }

    public Double getTargetAmount() {
        return targetAmount;
    }

    public Double getCurrentAmount() {
        return currentAmount;
    }

    public Integer getTargetYears() {
        return targetYears;
    }

    public GoalPriority getPriority() {
        return priority;
    }

    public GoalStatus getStatus() {
        return status;
    }
}
package com.app.dto.request;

import com.app.domain.enums.GoalPriority;

public class GoalRequestDTO {

    private String goalName;

    private Double targetAmount;

    private Double currentAmount;

    private Integer targetYears;

    private GoalPriority priority;

    public GoalRequestDTO() {
    }

    public String getGoalName() {
        return goalName;
    }

    public void setGoalName(String goalName) {
        this.goalName = goalName;
    }

    public Double getTargetAmount() {
        return targetAmount;
    }

    public void setTargetAmount(Double targetAmount) {
        this.targetAmount = targetAmount;
    }

    public Double getCurrentAmount() {
        return currentAmount;
    }

    public void setCurrentAmount(Double currentAmount) {
        this.currentAmount = currentAmount;
    }

    public Integer getTargetYears() {
        return targetYears;
    }

    public void setTargetYears(Integer targetYears) {
        this.targetYears = targetYears;
    }

    public GoalPriority getPriority() {
        return priority;
    }

    public void setPriority(GoalPriority priority) {
        this.priority = priority;
    }
}
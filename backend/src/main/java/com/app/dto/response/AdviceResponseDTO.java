package com.app.dto.response;

import java.util.List;

public class AdviceResponseDTO {

    private String summary;
    private List<String> actions;
    private Integer healthScore;

    public AdviceResponseDTO(String summary, List<String> actions, Integer healthScore) {
        this.summary = summary;
        this.actions = actions;
        this.healthScore = healthScore;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public List<String> getActions() {
        return actions;
    }

    public void setActions(List<String> actions) {
        this.actions = actions;
    }

    public Integer getHealthScore() {
        return healthScore;
    }

    public void setHealthScore(Integer healthScore) {
        this.healthScore = healthScore;
    }
}

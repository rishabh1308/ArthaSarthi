package com.app.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;
import java.util.Map;

public class AdviceRequestDTO {

    @JsonProperty("userId")
    private Long userId;

    @JsonProperty("query")
    private String query;

    private Map<String, Object> profile;


    public AdviceRequestDTO(Long userId, Map<String, Object> profile, String query) {
        this.userId = userId;
        this.profile = profile;
        this.query = query;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Map<String, Object> getProfile() {
        return profile;
    }

    public void setProfile(Map<String, Object> profile) {
        this.profile = profile;
    }

    public String getQuery() {
        return query;
    }

    public void setQuery(String query) {
        this.query = query;
    }
}

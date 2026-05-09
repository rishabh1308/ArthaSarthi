package com.app.domain.entity;

import com.app.domain.enums.AdviceGeneratedBy;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "advice_history")
public class AdviceHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT")
    private String query;

    @Column(columnDefinition = "TEXT")
    private String response;

    @Enumerated(EnumType.STRING)
    private AdviceGeneratedBy generatedBy;

    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "profile_id")
    private FinancialProfile financialProfile;

    @PrePersist
    public void onCreate() {
        createdAt = LocalDateTime.now();
    }

    public AdviceHistory() {
    }

    public Long getId() {
        return id;
    }

    public String getQuery() {
        return query;
    }

    public void setQuery(String query) {
        this.query = query;
    }

    public String getResponse() {
        return response;
    }

    public void setResponse(String response) {
        this.response = response;
    }

    public AdviceGeneratedBy getGeneratedBy() {
        return generatedBy;
    }

    public void setGeneratedBy(AdviceGeneratedBy generatedBy) {
        this.generatedBy = generatedBy;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public FinancialProfile getFinancialProfile() {
        return financialProfile;
    }

    public void setFinancialProfile(FinancialProfile financialProfile) {
        this.financialProfile = financialProfile;
    }
}
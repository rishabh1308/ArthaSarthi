package com.app.domain.entity;


import com.app.domain.enums.RiskLevel;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name="financial_profile")
public class FinancialProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long fpId;

    // for new user income, expenses, savings will be null
    private Double income;
    private Double expenses;
    private Double savings;

    @Enumerated(EnumType.STRING)
    private RiskLevel riskProfile;

    @Column(name="is_active") // maps the column is_active to the field isActive
    private Boolean isActive;

    @Column(name="created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    //Different financial profiles over History.
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id", nullable = false)
    private User user;

    public Long getFpId() {
        return fpId;
    }

    public void setFpId(Long fpId) {
        this.fpId = fpId;
    }

    public Double getIncome() {
        return income;
    }

    public void setIncome(Double income) {
        this.income = income;
    }

    public Double getExpenses() {
        return expenses;
    }

    public void setExpenses(Double expenses) {
        this.expenses = expenses;
    }

    public Double getSavings() {
        return savings;
    }

    public void setSavings(Double savings) {
        this.savings = savings;
    }

    public RiskLevel getRiskProfile() {
        return riskProfile;
    }

    public void setRiskProfile(RiskLevel riskProfile) {
        this.riskProfile = riskProfile;
    }

    public Boolean getActive() {
        return isActive;
    }

    public void setActive(Boolean active) {
        isActive = active;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
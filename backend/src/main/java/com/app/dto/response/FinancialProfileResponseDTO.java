package com.app.dto.response;

import com.app.domain.enums.RiskLevel;

public class FinancialProfileResponseDTO {

    private Long id;
    private Double income;
    private Double expenses;
    private Double savings;
    private String riskLevel;

    public FinancialProfileResponseDTO(Long id,Double income,  Double expenses, Double savings, String riskLevel) {
        this.id = id;
        this.income = income;
        this.expenses = expenses;
        this.savings = savings;
        this.riskLevel = riskLevel;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getRiskLevel() {
        return riskLevel;
    }

    public void setRiskLevel(String riskLevel) {
        this.riskLevel = riskLevel;
    }
}

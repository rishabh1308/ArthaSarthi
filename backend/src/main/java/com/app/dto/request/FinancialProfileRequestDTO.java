package com.app.dto.request;

import com.app.domain.enums.RiskLevel;
import com.fasterxml.jackson.annotation.JsonProperty;

public class FinancialProfileRequestDTO {

    private Double income;
    private Double expenses;
    private Double savings;
    @JsonProperty("riskLevel")
    private RiskLevel riskLevel;

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

    public RiskLevel getRiskLevel() {
        return riskLevel;
    }

    public void setRiskLevel(RiskLevel riskLevel) {
        this.riskLevel = riskLevel;
    }
}

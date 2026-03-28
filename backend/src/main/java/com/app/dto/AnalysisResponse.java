package com.app.dto;

import com.app.domain.enums.RiskLevel;

// currently using /analysis/{userId} in Controller as an API gateway for connecting data retrieved with user client.

public class AnalysisResponse {

    private Double totalIncome;
    private Double totalExpense;
    private Double savings;
    private RiskLevel riskLevel;

    public Double getTotalIncome() {
        return totalIncome;
    }

    public void setTotalIncome(Double totalIncome) {
        this.totalIncome = totalIncome;
    }

    public Double getTotalExpense() {
        return totalExpense;
    }

    public void setTotalExpense(Double totalExpense) {
        this.totalExpense = totalExpense;
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

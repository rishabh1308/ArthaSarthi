package com.app.service;

import com.app.domain.entity.Transaction;
import com.app.domain.enums.RiskLevel;
import com.app.dto.AnalysisResponse;
import com.app.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.app.domain.enums.TransactionType.EXPENSE;
import static com.app.domain.enums.TransactionType.INCOME;

@Service
public class AnalysisService {

    @Autowired
    private TransactionRepository transactionRepository;

    public AnalysisResponse analyse(Long userId){
        List<Transaction> transactions = transactionRepository.findByUserId(userId);

        double income = 0.0;
        double expense = 0.0;

        for(Transaction t: transactions){
            switch (t.getType()){
                case INCOME -> income = t.getType().apply(income, t.getAmount());
                case EXPENSE -> expense = t.getType().apply(expense, t.getAmount());
            }
        }

        double savings = income - expense;

        RiskLevel riskLevel = calculateRisk(income, expense);

        AnalysisResponse response = new AnalysisResponse();

        response.setTotalIncome(income);
        response.setTotalExpense(expense);
        response.setRiskLevel(riskLevel);
        response.setSavings(savings);

        return response;
    }

    private RiskLevel calculateRisk(double income, double expense) {

        if(income ==0) return RiskLevel.LOW;

        double ratio = expense/income;

        if(ratio < 0.5) return RiskLevel.HIGH;

        if(ratio < 0.7) return RiskLevel.MEDIUM;

        return RiskLevel.LOW;

    }

}

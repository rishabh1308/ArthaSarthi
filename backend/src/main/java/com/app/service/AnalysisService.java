package com.app.service;

import com.app.domain.entity.FinancialProfile;
import com.app.domain.entity.Transaction;
import com.app.domain.entity.User;
import com.app.domain.enums.RiskLevel;
import com.app.dto.AnalysisResponse;
import com.app.dto.AssetDTO;
import com.app.dto.FinancialProfileDTO;
import com.app.exceptions.ResourceNotFoundException;
import com.app.repository.FinancialProfileRepository;
import com.app.repository.TransactionRepository;
import com.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.*;

import static com.app.domain.enums.TransactionType.EXPENSE;

@Service
public class AnalysisService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private FinancialProfileRepository financialProfileRepository;

    @Autowired
    private UserRepository userRepository;


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

        saveFinancialProfile(userId, income, expense, savings, riskLevel);

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

    private void saveFinancialProfile(Long userId, double income, double expense, double savings, RiskLevel riskLevel) {
        // deactivating older Financial Profile
        financialProfileRepository
                .findUserByUserIdAndIsActiveTrue(userId)
                .ifPresent(financialProfile -> {
                    financialProfile.setActive(false);
                    financialProfileRepository.save(financialProfile);
                });

        // the workflow is :
        // Financial Repository is using to check through Optional that whether if any financialProfile
        // is present in DB.


        FinancialProfile profile = new FinancialProfile();
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("user not found"));

        profile.setActive(true);
        profile.setSavings(savings);
        profile.setRiskProfile(riskLevel);
        profile.setExpenses(expense);
        profile.setIncome(income);
        profile.setUser(user);

        financialProfileRepository.save(profile);

    }

    public FinancialProfileDTO mapToDTO(FinancialProfile financialProfile){

        FinancialProfileDTO dto = new FinancialProfileDTO();
        dto.setIncome(financialProfile.getIncome());
        dto.setExpenses(financialProfile.getExpenses());
        dto.setSavings(financialProfile.getSavings());
        dto.setRiskLevel(financialProfile.getRiskProfile().name());
        dto.setAssets(buildAssets(financialProfile.getUser().getId()));

        return dto;
    }

    List<AssetDTO> buildAssets(Long userId){

        List<Transaction> transactions = transactionRepository.findByUserId(userId);
        Map<String, Double> assetMap = new HashMap<>();

        for(Transaction transaction: transactions){
            if(transaction.getType() == EXPENSE) continue;
            String category = transaction.getCategory()==null?"": transaction.getCategory();
            String description = transaction.getDescription() == null? "" : transaction.getDescription();

            String combined = category + " " + description;

            String assetType = AssetDetectionService.detectAssetType(combined);

            if(assetType.equals("unknown")) continue;

            assetMap.put(assetType, assetMap.getOrDefault(assetType, 0.0)+ transaction.getAmount());
        }

        List<AssetDTO> assets = new ArrayList<>();
        for(Map.Entry<String, Double> entry: assetMap.entrySet()){
            assets.add(new AssetDTO(entry.getKey(), entry.getValue()));
        }

        return assets;

    }

}
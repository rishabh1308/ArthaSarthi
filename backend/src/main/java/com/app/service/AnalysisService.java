package com.app.service;

import com.app.domain.entity.FinancialProfile;
import com.app.domain.entity.Transaction;
import com.app.domain.entity.User;
import com.app.domain.enums.RiskLevel;
import com.app.domain.enums.TransactionType;
import com.app.dto.AssetDTO;
import com.app.dto.response.AnalysisResponse;
import com.app.dto.response.FinancialProfileResponseDTO;
import com.app.exceptions.ResourceNotFoundException;
import com.app.repository.FinancialProfileRepository;
import com.app.repository.TransactionRepository;
import com.app.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Slf4j
@Service
public class AnalysisService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private FinancialProfileRepository financialProfileRepository;

    @Autowired
    private UserRepository userRepository;

    public AnalysisResponse analyse(Long userId){

        log.info(
                "Starting financial analysis for user {}",
                userId
        );

        List<Transaction> transactions =
                transactionRepository.findByUserId(userId);

        log.debug(
                "Fetched {} transactions for user {}",
                transactions.size(),
                userId
        );

        double income = 0.0;
        double expense = 0.0;

        for (Transaction t : transactions) {

            if (t.getType() == TransactionType.CREDIT) {

                income += t.getAmount();

            } else if (t.getType() == TransactionType.DEBIT) {

                expense += t.getAmount();
            }
        }

        double savings = income - expense;

        log.debug(
                "Calculated income={}, expense={}, savings={} for user {}",
                income,
                expense,
                savings,
                userId
        );

        RiskLevel riskLevel =
                calculateRisk(income, expense);

        log.info(
                "Calculated risk level {} for user {}",
                riskLevel,
                userId
        );

        saveFinancialProfile(
                userId,
                income,
                expense,
                savings,
                riskLevel
        );

        AnalysisResponse response =
                new AnalysisResponse();

        response.setTotalIncome(income);

        response.setTotalExpense(expense);

        response.setRiskLevel(riskLevel);

        response.setSavings(savings);

        log.info(
                "Financial analysis completed successfully for user {}",
                userId
        );

        return response;
    }

    private RiskLevel calculateRisk(
            double income,
            double expense
    ) {

        if(income == 0) {

            log.warn(
                    "Income is zero while calculating risk"
            );

            return RiskLevel.LOW;
        }

        double ratio = expense / income;

        log.debug(
                "Expense to income ratio calculated: {}",
                ratio
        );

        if(ratio < 0.5) {

            return RiskLevel.HIGH;
        }

        if(ratio < 0.7) {

            return RiskLevel.MEDIUM;
        }

        return RiskLevel.LOW;
    }

    private void saveFinancialProfile(
            Long userId,
            double income,
            double expense,
            double savings,
            RiskLevel riskLevel
    ) {

        log.info(
                "Saving financial profile for user {}",
                userId
        );

        // deactivate older profile
        financialProfileRepository
                .findUserByUserIdAndIsActiveTrue(userId)
                .ifPresent(existingProfile -> {

                    log.debug(
                            "Deactivating previous active profile for user {}",
                            userId
                    );

                    existingProfile.setActive(false);

                    financialProfileRepository
                            .save(existingProfile);
                });

        FinancialProfile profile =
                new FinancialProfile();

        User user = userRepository.findById(userId)
                .orElseThrow(() -> {

                    log.error(
                            "User not found while saving financial profile. User ID: {}",
                            userId
                    );

                    return new ResourceNotFoundException(
                            "user not found"
                    );
                });

        profile.setActive(true);

        profile.setSavings(savings);

        profile.setRiskProfile(riskLevel);

        profile.setExpenses(expense);

        profile.setIncome(income);

        profile.setUser(user);

        financialProfileRepository.save(profile);

        log.info(
                "Financial profile saved successfully for user {}",
                userId
        );
    }

    public FinancialProfileResponseDTO mapToDTO(
            FinancialProfile financialProfile
    ){

        log.debug(
                "Mapping FinancialProfile to DTO for user {}",
                financialProfile.getUser().getId()
        );

        return new FinancialProfileResponseDTO(
                financialProfile.getUser().getId(),
                financialProfile.getIncome(),
                financialProfile.getExpenses(),
                financialProfile.getSavings(),
                financialProfile.getRiskProfile().name()
        );
    }

    List<AssetDTO> buildAssets(Long userId){

        log.info(
                "Building asset allocation for user {}",
                userId
        );

        List<Transaction> transactions =
                transactionRepository.findByUserId(userId);

        Map<String, Double> assetMap =
                new HashMap<>();

        for(Transaction transaction : transactions){

            if(transaction.getType() ==
                    TransactionType.DEBIT) {

                continue;
            }

            String category =
                    transaction.getCategory() == null
                            ? ""
                            : transaction.getCategory();

            String description =
                    transaction.getDescription() == null
                            ? ""
                            : transaction.getDescription();

            String combined =
                    category + " " + description;

            String assetType =
                    AssetDetectionService
                            .detectAssetType(combined);

            if(assetType.equals("unknown")) {

                log.debug(
                        "Skipping unknown asset type for transaction {}",
                        transaction.getId()
                );

                continue;
            }

            assetMap.put(
                    assetType,
                    assetMap.getOrDefault(
                            assetType,
                            0.0
                    ) + transaction.getAmount()
            );
        }

        List<AssetDTO> assets =
                new ArrayList<>();

        for(Map.Entry<String, Double> entry
                : assetMap.entrySet()){

            assets.add(
                    new AssetDTO(
                            entry.getKey(),
                            entry.getValue()
                    )
            );
        }

        log.info(
                "Built {} assets for user {}",
                assets.size(),
                userId
        );

        return assets;
    }

    public List<AssetDTO> getUserAssets(
            Long userId
    ){

        log.info(
                "Fetching assets for user {}",
                userId
        );

        return buildAssets(userId);
    }
}
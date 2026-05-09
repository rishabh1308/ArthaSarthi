package com.app.service;

import com.app.domain.entity.Transaction;
import com.app.domain.entity.User;
import com.app.dto.request.TransactionRequestDTO;
import com.app.dto.response.TransactionResponseDTO;
import com.app.exceptions.ResourceNotFoundException;
import com.app.repository.TransactionRepository;
import com.app.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public TransactionResponseDTO addTransaction(
            Long userId,
            TransactionRequestDTO request
    ){

        log.info(
                "Adding transaction for user {}",
                userId
        );

        User user = userRepository.findById(userId)
                .orElseThrow(() -> {

                    log.error(
                            "User not found while adding transaction. User ID: {}",
                            userId
                    );

                    return new ResourceNotFoundException(
                            "User not found"
                    );
                });

        Transaction transaction =
                mapToEntity(request, user);

        Transaction saved =
                transactionRepository.save(transaction);

        log.info(
                "Transaction {} saved successfully for user {}",
                saved.getId(),
                userId
        );

        return mapToResponse(saved);
    }

    public List<TransactionResponseDTO>
    getUserTransactions(Long userId){

        log.info(
                "Fetching transactions for user {}",
                userId
        );

        if (!userRepository.existsById(userId)) {

            log.error(
                    "User not found while fetching transactions. User ID: {}",
                    userId
            );

            throw new ResourceNotFoundException(
                    "User not found"
            );
        }

        List<TransactionResponseDTO> transactions =
                transactionRepository.findByUserId(userId)
                        .stream()
                        .map(this::mapToResponse)
                        .toList();

        log.debug(
                "Fetched {} transactions for user {}",
                transactions.size(),
                userId
        );

        return transactions;
    }

    private Transaction mapToEntity(
            TransactionRequestDTO request,
            User user
    ){

        log.debug(
                "Mapping transaction request to entity for user {}",
                user.getId()
        );

        Transaction transaction =
                new Transaction();

        transaction.setUser(user);

        transaction.setAmount(
                request.getAmount()
        );

        transaction.setCategory(
                request.getCategory()
        );

        transaction.setType(
                request.getType()
        );

        transaction.setDescription(
                request.getDescription()
        );

        transaction.setTransactionDate(
                LocalDateTime.now()
        );

        return transaction;
    }

    private TransactionResponseDTO mapToResponse(
            Transaction transaction
    ){

        log.debug(
                "Mapping transaction {} to response DTO",
                transaction.getId()
        );

        TransactionResponseDTO dto =
                new TransactionResponseDTO();

        dto.setTransactionId(
                transaction.getId()
        );

        dto.setTransactionDate(
                transaction.getTransactionDate()
        );

        dto.setType(
                transaction.getType()
        );

        dto.setAmount(
                transaction.getAmount()
        );

        dto.setDescription(
                transaction.getDescription()
        );

        dto.setCategory(
                transaction.getCategory()
        );

        dto.setUserId(
                transaction.getUser().getId()
        );

        return dto;
    }
}
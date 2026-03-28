package com.app.service;

import com.app.domain.entity.Transaction;
import com.app.domain.entity.User;
import com.app.dto.TransactionRequest;
import com.app.dto.TransactionResponse;
import com.app.exceptions.ResourceNotFoundException;
import com.app.repository.TransactionRepository;
import com.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private UserRepository userRepository ;
    // Commit-Rollback / Maintain Atomicity
    @Transactional
    public TransactionResponse addTransaction(TransactionRequest request){

        User user = userRepository.findById(request.getUserId()).orElseThrow(()->new ResourceNotFoundException("User not found"));

        // TRANSIENT state = not tracked by Hibernate .

        Transaction transaction = new Transaction(); // Transient

        // mapping DTO -> Transaction Entity

        transaction.setUser(user);
        transaction.setAmount(request.getAmount());
        transaction.setCategory(request.getCategory());
        transaction.setType(request.getType());
        transaction.setDescription(request.getDescription());
        transaction.setTransactionDate(LocalDateTime.now());

        // now it gets saved by Hibernate and then it becomes Managed.

        Transaction saved =  transactionRepository.save(transaction);

        // Response DTO

        TransactionResponse response = new TransactionResponse();
        response.setTransactionId(saved.getId());
        response.setTransactionDate(saved.getTransactionDate());
        response.setType(saved.getType());
        response.setAmount(saved.getAmount());
        response.setDescription(saved.getDescription());
        response.setCategory(saved.getCategory());
        response.setUserId(saved.getUser().getId());

        return response;

    }
}

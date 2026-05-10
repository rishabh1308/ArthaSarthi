package com.app.controller;

import com.app.dto.request.TransactionRequestDTO;
import com.app.dto.response.ApiResponse;
import com.app.dto.response.TransactionResponseDTO;
import com.app.service.TransactionService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/users/{userId}/transactions")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @Operation(
            summary = "Add transaction",
            description = "Creates a new financial transaction"
    )
    @PostMapping
    public ResponseEntity<
            ApiResponse<TransactionResponseDTO>
            > addTransaction(

            @PathVariable Long userId,

            @Valid
            @RequestBody
            TransactionRequestDTO request
    ){

        log.info(
                "POST /users/{}/transactions called",
                userId
        );

        TransactionResponseDTO response =
                transactionService.addTransaction(
                        userId,
                        request
                );

        log.info(
                "Transaction added successfully for user {}",
                userId
        );

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Transaction added successfully",
                        response
                )
        );
    }

    @Operation(
            summary = "Get user transactions",
            description = "Fetches all transactions of a user"
    )
    @GetMapping
    public ResponseEntity<
            ApiResponse<List<TransactionResponseDTO>>
            > getUserTransactions(

            @PathVariable Long userId
    ){

        log.info(
                "GET /users/{}/transactions called",
                userId
        );

        List<TransactionResponseDTO> transactions =
                transactionService
                        .getUserTransactions(userId);

        log.info(
                "Transactions fetched successfully for user {}",
                userId
        );

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Transactions fetched successfully",
                        transactions
                )
        );
    }
}
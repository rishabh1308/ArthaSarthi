package com.app.controller;

import com.app.dto.request.TransactionRequestDTO;
import com.app.dto.response.ApiResponse;
import com.app.dto.response.TransactionResponseDTO;
import com.app.service.TransactionService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users/{userId}/transactions")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;


    @PostMapping
    public ResponseEntity<TransactionResponseDTO> addTransaction(@PathVariable Long userId, @Valid @RequestBody TransactionRequestDTO request){
        // RequestBody automatically maps TransactionRequestDTO.java to request variable of Object TransactionRequestDTO
        // Valid is used to trigger validation of request objects in Spring, ensuring that incoming data satisfies
        // defined constraints before the controller method executes.
        return ResponseEntity.ok(transactionService.addTransaction(userId,request));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<TransactionResponseDTO>>> getUserTransactions(@PathVariable Long userId){
        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Transactions fetched successfully",
                        transactionService.getUserTransactions(userId)
                )
        );
    }

}

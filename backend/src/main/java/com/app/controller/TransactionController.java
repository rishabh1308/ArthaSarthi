package com.app.controller;

import com.app.dto.TransactionRequest;
import com.app.dto.TransactionResponse;
import com.app.service.TransactionService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/transactions")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;


    @PostMapping
    public ResponseEntity<TransactionResponse> addTransaction(@Valid @RequestBody TransactionRequest request){
        // RequestBody automatically maps TransactionRequest.java to request variable of Object TransactionRequest
        // Valid is used to trigger validation of request objects in Spring, ensuring that incoming data satisfies
        // defined constraints before the controller method executes.
        return ResponseEntity.ok(transactionService.addTransaction(request));
    }

}

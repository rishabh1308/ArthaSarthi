package com.app.exceptions;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<?> handleNotFound(ResourceNotFoundException exception){
        return ResponseEntity.status(404).body(
                Map.of("error", exception.getMessage())
        );
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleGeneric(Exception exception){

        return ResponseEntity.status(500).body(
                Map.of(
                        "error","Internal Server Error"
                )
        );

    }
}

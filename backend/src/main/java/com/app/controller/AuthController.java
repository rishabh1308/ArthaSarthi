package com.app.controller;

import com.app.dto.AuthResponseDTO;
import com.app.dto.request.AuthRequestDTO;
import com.app.dto.request.RegisterRequestDTO;
import com.app.dto.response.ApiResponse;
import com.app.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Authentication APIs")
@Slf4j
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    public AuthService authService;

    @Operation(
            summary = "Register user",
            description = "Creates a new user account and returns JWT token"
    )
    @PostMapping("/register")
    public ResponseEntity<ApiResponse<AuthResponseDTO>>
    register(
            @Valid
            @RequestBody
            RegisterRequestDTO request
    ){

        log.info(
                "POST /auth/register called for email {}",
                request.getEmail()
        );

        authService.register(
                request.getEmail(),
                request.getName(),
                request.getPassword(),
                request.getAge()
        );

        String token =
                authService.login(
                        request.getEmail(),
                        request.getPassword()
                );

        log.info(
                "User registered successfully with email {}",
                request.getEmail()
        );

        AuthResponseDTO response =
                new AuthResponseDTO(
                        token,
                        "User registered successfully."
                );

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Registration successful",
                        response
                )
        );
    }

    @Operation(
            summary = "Login user",
            description = "Authenticates user and returns JWT token"
    )
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponseDTO>>
    login(
            @Valid
            @RequestBody
            AuthRequestDTO request
    ){

        log.info(
                "POST /auth/login called for email {}",
                request.getEmail()
        );

        String token =
                authService.login(
                        request.getEmail(),
                        request.getPassword()
                );

        log.info(
                "Login successful for email {}",
                request.getEmail()
        );

        AuthResponseDTO response =
                new AuthResponseDTO(
                        token,
                        "Login successful."
                );

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Login successful",
                        response
                )
        );
    }
}
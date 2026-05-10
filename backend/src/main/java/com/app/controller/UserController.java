package com.app.controller;

import com.app.dto.request.FinancialProfileRequestDTO;
import com.app.dto.request.RegisterRequestDTO;
import com.app.dto.response.ApiResponse;
import com.app.dto.response.FinancialProfileResponseDTO;
import com.app.dto.response.UserResponseDTO;
import com.app.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Operation(
            summary = "Create user",
            description = "Registers a new user"
    )
    @PostMapping
    public ResponseEntity<ApiResponse<UserResponseDTO>>
    createUser(

            @Valid
            @RequestBody
            RegisterRequestDTO dto
    ){

        log.info(
                "POST /users called for email {}",
                dto.getEmail()
        );

        UserResponseDTO response =
                userService.register(dto);

        log.info(
                "User created successfully for email {}",
                dto.getEmail()
        );

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "User created successfully",
                        response
                )
        );
    }

    @Operation(
            summary = "Create financial profile",
            description = "Creates financial profile for a user"
    )
    @PostMapping("/{userId}/profile")
    public ResponseEntity<
            ApiResponse<FinancialProfileResponseDTO>
            > createProfile(

            @PathVariable Long userId,

            @Valid
            @RequestBody
            FinancialProfileRequestDTO dto
    ){

        log.info(
                "POST /users/{}/profile called",
                userId
        );

        FinancialProfileResponseDTO response =
                userService.createProfile(
                        userId,
                        dto
                );

        log.info(
                "Financial profile created successfully for user {}",
                userId
        );

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Financial profile created successfully",
                        response
                )
        );
    }

    @Operation(
            summary = "Get financial profile",
            description = "Fetches financial profile of a user"
    )
    @GetMapping("/{userId}/profile")
    public ResponseEntity<
            ApiResponse<FinancialProfileResponseDTO>
            > getProfile(

            @PathVariable Long userId
    ){

        log.info(
                "GET /users/{}/profile called",
                userId
        );

        FinancialProfileResponseDTO response =
                userService.getProfile(userId);

        log.info(
                "Financial profile fetched successfully for user {}",
                userId
        );

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Financial profile fetched successfully",
                        response
                )
        );
    }

    @Operation(
            summary = "Update financial profile",
            description = "Updates user financial profile"
    )
    @PutMapping("/{userId}/profile")
    public ResponseEntity<
            ApiResponse<FinancialProfileResponseDTO>
            > updateProfile(

            @PathVariable Long userId,

            @Valid
            @RequestBody
            FinancialProfileRequestDTO dto
    ){

        log.info(
                "PUT /users/{}/profile called",
                userId
        );

        FinancialProfileResponseDTO response =
                userService.updateProfile(
                        userId,
                        dto
                );

        log.info(
                "Financial profile updated successfully for user {}",
                userId
        );

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Financial profile updated successfully",
                        response
                )
        );
    }
}
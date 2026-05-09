package com.app.controller;

import com.app.dto.request.FinancialProfileRequestDTO;
import com.app.dto.request.RegisterRequestDTO;
import com.app.dto.response.FinancialProfileResponseDTO;
import com.app.dto.response.UserResponseDTO;
import com.app.repository.UserRepository;
import com.app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<UserResponseDTO> createUser(@RequestBody RegisterRequestDTO dto){
        return ResponseEntity.ok(userService.register(dto));
    }

    @PostMapping("/{userId}/profile")
    public ResponseEntity<?> createProfile(@PathVariable Long userId, @RequestBody FinancialProfileRequestDTO dto){
        return ResponseEntity.ok(userService.createProfile(userId,dto));
    }

    @GetMapping("/{userId}/profile")
    public ResponseEntity<FinancialProfileResponseDTO> getProfile(@PathVariable Long userId, @RequestBody FinancialProfileRequestDTO dto){
        return ResponseEntity.ok(userService.updateProfile(userId, dto));
    }

    @PutMapping("/{userId}/profile")
    public ResponseEntity<FinancialProfileResponseDTO> updateProfile(@PathVariable Long userId, @RequestBody FinancialProfileRequestDTO dto){
        return ResponseEntity.ok(userService.updateProfile(userId, dto));
    }

}

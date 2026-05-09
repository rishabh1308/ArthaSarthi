package com.app.controller;

import com.app.dto.request.AuthRequestDTO;
import com.app.dto.AuthResponseDTO;
import com.app.dto.request.RegisterRequestDTO;
import com.app.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    public AuthService authService;

    @PostMapping("/register")
    public AuthResponseDTO register(@RequestBody RegisterRequestDTO request){

        authService.register(request.getEmail(),request.getName(), request.getPassword(), request.getAge() );

        String token = authService.login(request.getEmail(), request.getPassword());

        return new AuthResponseDTO(token,"User registered successfully.");

    }


    @PostMapping("/login")
    public AuthResponseDTO login(@RequestBody AuthRequestDTO request){

        String token = authService.login(request.getEmail(), request.getPassword());

        return new AuthResponseDTO(token, "login successful.");

    }





}

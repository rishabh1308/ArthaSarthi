package com.app.service;

import com.app.domain.entity.User;
import com.app.repository.UserRepository;
import com.app.security.JwUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwUtil jwUtil;

    public void register(
            String email,
            String name,
            String password,
            Integer age
    ){

        log.info(
                "Registration attempt for email {}",
                email
        );

        if(userRepository
                .findUserByEmail(email)
                .isPresent()){

            log.warn(
                    "Registration failed. User already exists with email {}",
                    email
            );

            throw new RuntimeException(
                    "User already exists"
            );
        }

        User user = new User();

        user.setEmail(email);

        user.setPassword(
                passwordEncoder.encode(password)
        );

        user.setName(name);

        user.setAge(age);

        userRepository.save(user);

        log.info(
                "User registered successfully with email {}",
                email
        );
    }

    public String login(
            String email,
            String password
    ){

        log.info(
                "Login attempt for email {}",
                email
        );

        User user = userRepository
                .findUserByEmail(email)
                .orElseThrow(() -> {

                    log.warn(
                            "Login failed. User not found for email {}",
                            email
                    );

                    return new RuntimeException(
                            "User not found"
                    );
                });

        if(!passwordEncoder.matches(
                password,
                user.getPassword()
        )) {

            log.warn(
                    "Login failed due to invalid password for email {}",
                    email
            );

            throw new RuntimeException(
                    "Password Incorrect"
            );
        }

        log.info(
                "Login successful for email {}",
                email
        );

        return jwUtil.generateToken(email);
    }
}
package com.app.service;

import com.app.domain.entity.FinancialProfile;
import com.app.domain.entity.User;
import com.app.dto.request.FinancialProfileRequestDTO;
import com.app.dto.request.RegisterRequestDTO;
import com.app.dto.response.FinancialProfileResponseDTO;
import com.app.dto.response.UserResponseDTO;
import com.app.repository.FinancialProfileRepository;
import com.app.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FinancialProfileRepository
            financialProfileRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserResponseDTO getUserByEmail(
            String email
    ){

        log.info(
                "Fetching user by email {}",
                email
        );

        User user = userRepository.findUserByEmail(email)
                .orElseThrow(() -> {

                    log.error(
                            "User not found for email {}",
                            email
                    );

                    return new RuntimeException(
                            "User not found"
                    );
                });

        return mapToDTO(user);
    }

    public UserResponseDTO mapToDTO(
            User user
    ){

        log.debug(
                "Mapping user {} to DTO",
                user.getId()
        );

        return new UserResponseDTO(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getAge(),
                user.getCreatedAt()
        );
    }

    public FinancialProfileResponseDTO createProfile(
            Long userId,
            FinancialProfileRequestDTO dto
    ){

        log.info(
                "Creating financial profile for user {}",
                userId
        );

        User user = userRepository.findUserById(userId)
                .orElseThrow(() -> {

                    log.error(
                            "User not found while creating profile. User ID: {}",
                            userId
                    );

                    return new RuntimeException(
                            "User not found"
                    );
                });

        FinancialProfile profile =
                new FinancialProfile();

        profile.setUser(user);

        profile.setIncome(dto.getIncome());

        profile.setExpenses(dto.getExpenses());

        profile.setSavings(dto.getSavings());

        profile.setRiskProfile(dto.getRiskLevel());

        FinancialProfile savedProfile =
                financialProfileRepository.save(profile);

        log.info(
                "Financial profile created successfully for user {}",
                userId
        );

        return new FinancialProfileResponseDTO(
                savedProfile.getFpId(),
                savedProfile.getIncome(),
                savedProfile.getExpenses(),
                savedProfile.getSavings(),
                savedProfile.getRiskProfile().name()
        );
    }

    public UserResponseDTO register(
            RegisterRequestDTO dto
    ) {

        log.info(
                "Registering user with email {}",
                dto.getEmail()
        );

        User user = new User();

        user.setName(dto.getName());

        user.setEmail(dto.getEmail());

        user.setAge(dto.getAge());

        user.setPassword(
                passwordEncoder.encode(
                        dto.getPassword()
                )
        );

        User savedUser =
                userRepository.save(user);

        log.info(
                "User registered successfully with ID {}",
                savedUser.getId()
        );

        return new UserResponseDTO(
                savedUser.getId(),
                savedUser.getName(),
                savedUser.getEmail(),
                savedUser.getAge(),
                savedUser.getCreatedAt()
        );
    }

    public FinancialProfileResponseDTO getProfile(
            Long userId
    ){

        log.info(
                "Fetching financial profile for user {}",
                userId
        );

        FinancialProfile profile =
                financialProfileRepository
                        .findAllByUserId(userId)
                        .orElseThrow(() -> {

                            log.error(
                                    "Financial profile not found for user {}",
                                    userId
                            );

                            return new RuntimeException(
                                    "Profile not found"
                            );
                        });

        log.info(
                "Financial profile fetched successfully for user {}",
                userId
        );

        return new FinancialProfileResponseDTO(
                profile.getFpId(),
                profile.getIncome(),
                profile.getExpenses(),
                profile.getSavings(),
                profile.getRiskProfile().name()
        );
    }

    public FinancialProfileResponseDTO updateProfile(
            Long userId,
            FinancialProfileRequestDTO dto
    ){

        log.info(
                "Updating financial profile for user {}",
                userId
        );

        FinancialProfile profile =
                financialProfileRepository
                        .findAllByUserId(userId)
                        .orElseThrow(() -> {

                            log.error(
                                    "Profile not found for user {}",
                                    userId
                            );

                            return new RuntimeException(
                                    "Profile not found"
                            );
                        });

        mapDtoToEntity(profile, dto);

        financialProfileRepository.save(profile);

        log.info(
                "Financial profile updated successfully for user {}",
                userId
        );

        return new FinancialProfileResponseDTO(
                profile.getFpId(),
                profile.getIncome(),
                profile.getExpenses(),
                profile.getSavings(),
                profile.getRiskProfile().name()
        );
    }

    private void mapDtoToEntity(
            FinancialProfile profile,
            FinancialProfileRequestDTO dto
    ){

        log.debug(
                "Mapping FinancialProfileRequestDTO to entity"
        );

        profile.setIncome(dto.getIncome());

        profile.setExpenses(dto.getExpenses());

        profile.setSavings(dto.getSavings());

        profile.setRiskProfile(dto.getRiskLevel());
    }

    @Override
    public UserDetails loadUserByUsername(
            String email
    ) throws UsernameNotFoundException {

        log.debug(
                "Loading user details for email {}",
                email
        );

        User user = userRepository.findUserByEmail(email)
                .orElseThrow(() -> {

                    log.error(
                            "UserDetails lookup failed for email {}",
                            email
                    );

                    return new UsernameNotFoundException(
                            "User not found"
                    );
                });

        return org.springframework.security.core.userdetails.User
                .builder()
                .username(user.getEmail())
                .password(user.getPassword())
                .authorities("USER")
                .build();
    }
}
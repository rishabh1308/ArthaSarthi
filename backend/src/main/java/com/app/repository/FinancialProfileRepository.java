package com.app.repository;


import com.app.domain.entity.FinancialProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface FinancialProfileRepository extends JpaRepository<FinancialProfile, Long> {
    Optional<FinancialProfile> findUserByUserIdAndIsActiveTrue(Long userId);
}

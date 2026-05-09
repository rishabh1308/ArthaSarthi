package com.app.repository;

import com.app.domain.entity.AdviceHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AdviceHistoryRepository
        extends JpaRepository<AdviceHistory, Long> {

    List<AdviceHistory>
    findByUserIdOrderByCreatedAtDesc(Long userId);
}
package  com.app.repository;

import com.app.domain.entity.Transaction;
import com.app.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

// transactions are set using Long transactionId;
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByUserId(Long userId); // Many transactions belong to one user.
}

package com.app.domain.entity;

import com.app.domain.enums.TransactionType;
import jakarta.persistence.*;
import org.antlr.v4.runtime.misc.NotNull;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name="transactions")
public class Transaction {

    @Id // primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY) // IDENTITY for MYSql which is auto incremented
    private Long transactionId;

   @NotNull
    private Double amount;

    @Enumerated(EnumType.STRING) // should have enum types  INCOME, EXPENSE
    @Column(nullable = false)
    private TransactionType type;

    @Column(nullable = true)
    private String category;

    @Column(nullable = true)
    private String description;

    @Column(name="transaction_date", nullable = false)
    private LocalDateTime transactionDate;

    @Column(name="created_at", insertable = false, updatable = false)
    private LocalDateTime createdDate;

    @ManyToOne(fetch = FetchType.LAZY)
    // LAZY -> load data when it is actually needed else(EAGER) when fetching transaction, users is also fetched.
    // Currently - fetching data from transactions will just give me data from transactions and Not User.
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Long getTransactionId() {
        return transactionId;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public TransactionType getType() {
        return type;
    }

    public void setType(TransactionType type) {
        this.type = type;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getTransactionDate() {
        return transactionDate;
    }

    public void setTransactionDate(LocalDateTime transactionDate) {
        this.transactionDate = transactionDate;
    }

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

}

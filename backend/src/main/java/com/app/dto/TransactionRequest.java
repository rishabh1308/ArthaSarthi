package com.app.dto;

// loosely coupling Transaction while adding.
// DTO are used for API communication ; JSON -> DTO -> Service -> Repository -> DB
import com.app.domain.enums.TransactionType;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

public class TransactionRequest {
    @NotNull(message = "User ID is required")
    private Long userId;

    @NotNull(message = "Amount required")
    @Positive(message = "Must be greater than 0")
    private Double amount;

    @NotNull(message = "Transaction Type is required")
    private TransactionType type;

    @Size(max=50, message = "Category is too long")
    private String category;

    @Size(max=200, message = "Description is too long")
    private String description;

    public Long getUserId() { return userId; }

    public void  setUserId(Long userId) { this.userId = userId; }

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

    public String getDescription() { return description; }

    public void setDescription(String description) {
        this.description = description;
    }
}

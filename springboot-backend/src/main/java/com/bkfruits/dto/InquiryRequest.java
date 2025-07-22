package com.bkfruits.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public class InquiryRequest {
    
    @NotNull(message = "Fruit ID is required")
    private Long fruitId;
    
    @NotBlank(message = "Message is required")
    private String message;
    
    @NotNull(message = "Quantity is required")
    @DecimalMin(value = "0.1", message = "Quantity must be greater than 0")
    private BigDecimal quantity;
    
    // Constructors
    public InquiryRequest() {}
    
    public InquiryRequest(Long fruitId, String message, BigDecimal quantity) {
        this.fruitId = fruitId;
        this.message = message;
        this.quantity = quantity;
    }
    
    // Getters and Setters
    public Long getFruitId() { return fruitId; }
    public void setFruitId(Long fruitId) { this.fruitId = fruitId; }
    
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    
    public BigDecimal getQuantity() { return quantity; }
    public void setQuantity(BigDecimal quantity) { this.quantity = quantity; }
}
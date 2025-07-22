package com.bkfruits.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;
import java.time.LocalDate;

public class FruitRequest {
    
    @NotBlank(message = "Fruit name is required")
    @Size(max = 255)
    private String name;
    
    @NotBlank(message = "Fruit type is required")
    @Size(max = 100)
    private String type;
    
    @NotNull(message = "Quantity is required")
    @DecimalMin(value = "0.1", message = "Quantity must be greater than 0")
    private BigDecimal quantity;
    
    @NotNull(message = "Price is required")
    @DecimalMin(value = "0.01", message = "Price must be greater than 0")
    private BigDecimal price;
    
    @NotBlank(message = "Location is required")
    @Size(max = 255)
    private String location;
    
    private String image;
    
    private String description;
    
    @NotNull(message = "Harvest date is required")
    private LocalDate harvestDate;
    
    // Constructors
    public FruitRequest() {}
    
    public FruitRequest(String name, String type, BigDecimal quantity, BigDecimal price, 
                       String location, String description, LocalDate harvestDate) {
        this.name = name;
        this.type = type;
        this.quantity = quantity;
        this.price = price;
        this.location = location;
        this.description = description;
        this.harvestDate = harvestDate;
    }
    
    // Getters and Setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    
    public BigDecimal getQuantity() { return quantity; }
    public void setQuantity(BigDecimal quantity) { this.quantity = quantity; }
    
    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }
    
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    
    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public LocalDate getHarvestDate() { return harvestDate; }
    public void setHarvestDate(LocalDate harvestDate) { this.harvestDate = harvestDate; }
}
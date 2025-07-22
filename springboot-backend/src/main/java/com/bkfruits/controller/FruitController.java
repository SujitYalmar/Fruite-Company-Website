package com.bkfruits.controller;

import com.bkfruits.dto.ApiResponse;
import com.bkfruits.dto.FruitRequest;
import com.bkfruits.model.Fruit;
import com.bkfruits.model.User;
import com.bkfruits.service.FruitService;
import com.bkfruits.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/fruits")
@CrossOrigin(origins = "*", maxAge = 3600)
public class FruitController {

    @Autowired
    private FruitService fruitService;

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<?> getAllFruits(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir,
            @RequestParam(required = false) String type,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(required = false) Fruit.Status status,
            @RequestParam(required = false) String search) {
        
        try {
            Sort sort = sortDir.equalsIgnoreCase("desc") ? 
                Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
            Pageable pageable = PageRequest.of(page, size, sort);
            
            Page<Fruit> fruits = fruitService.getFruitsWithFilters(
                type, location, minPrice, maxPrice, status, search, pageable);
            
            return ResponseEntity.ok(ApiResponse.success("Fruits retrieved successfully", fruits));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Failed to retrieve fruits: " + e.getMessage()));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getFruitById(@PathVariable Long id) {
        try {
            Fruit fruit = fruitService.findById(id);
            return ResponseEntity.ok(ApiResponse.success("Fruit retrieved successfully", fruit));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Fruit not found"));
        }
    }

    @PostMapping
    @PreAuthorize("hasRole('FARMER')")
    public ResponseEntity<?> createFruit(@Valid @RequestBody FruitRequest fruitRequest,
                                        Authentication authentication) {
        try {
            User user = userService.findByEmail(authentication.getName());
            Fruit fruit = fruitService.createFruit(fruitRequest, user.getId());
            
            return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Fruit listing created successfully", fruit));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Failed to create fruit listing: " + e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('FARMER')")
    public ResponseEntity<?> updateFruit(@PathVariable Long id,
                                        @Valid @RequestBody FruitRequest fruitRequest,
                                        Authentication authentication) {
        try {
            User user = userService.findByEmail(authentication.getName());
            Fruit fruit = fruitService.updateFruit(id, fruitRequest, user.getId());
            
            return ResponseEntity.ok(ApiResponse.success("Fruit listing updated successfully", fruit));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Failed to update fruit listing: " + e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('FARMER')")
    public ResponseEntity<?> deleteFruit(@PathVariable Long id, Authentication authentication) {
        try {
            User user = userService.findByEmail(authentication.getName());
            fruitService.deleteFruit(id, user.getId());
            
            return ResponseEntity.ok(ApiResponse.success("Fruit listing deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Failed to delete fruit listing: " + e.getMessage()));
        }
    }

    @GetMapping("/farmer/my-listings")
    @PreAuthorize("hasRole('FARMER')")
    public ResponseEntity<?> getMyFruitListings(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            Authentication authentication) {
        try {
            User user = userService.findByEmail(authentication.getName());
            Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
            Page<Fruit> fruits = fruitService.getFruitsByFarmer(user.getId(), pageable);
            
            return ResponseEntity.ok(ApiResponse.success("Your fruit listings retrieved successfully", fruits));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Failed to retrieve your fruit listings: " + e.getMessage()));
        }
    }

    @PutMapping("/{id}/status")
    @PreAuthorize("hasRole('FARMER')")
    public ResponseEntity<?> updateFruitStatus(@PathVariable Long id,
                                              @RequestParam Fruit.Status status,
                                              Authentication authentication) {
        try {
            User user = userService.findByEmail(authentication.getName());
            Fruit fruit = fruitService.updateFruitStatus(id, status, user.getId());
            
            return ResponseEntity.ok(ApiResponse.success("Fruit status updated successfully", fruit));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Failed to update fruit status: " + e.getMessage()));
        }
    }

    @GetMapping("/stats/overview")
    @PreAuthorize("hasRole('FARMER')")
    public ResponseEntity<?> getFarmerStats(Authentication authentication) {
        try {
            User user = userService.findByEmail(authentication.getName());
            Map<String, Object> stats = fruitService.getFarmerStats(user.getId());
            
            return ResponseEntity.ok(ApiResponse.success("Statistics retrieved successfully", stats));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Failed to retrieve statistics: " + e.getMessage()));
        }
    }

    @GetMapping("/types")
    public ResponseEntity<?> getDistinctTypes() {
        try {
            List<String> types = fruitService.getDistinctTypes();
            return ResponseEntity.ok(ApiResponse.success("Fruit types retrieved successfully", types));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Failed to retrieve fruit types: " + e.getMessage()));
        }
    }

    @GetMapping("/locations")
    public ResponseEntity<?> getDistinctLocations() {
        try {
            List<String> locations = fruitService.getDistinctLocations();
            return ResponseEntity.ok(ApiResponse.success("Locations retrieved successfully", locations));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Failed to retrieve locations: " + e.getMessage()));
        }
    }
}
package com.bkfruits.controller;

import com.bkfruits.dto.ApiResponse;
import com.bkfruits.dto.InquiryRequest;
import com.bkfruits.model.Inquiry;
import com.bkfruits.model.User;
import com.bkfruits.service.InquiryService;
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

@RestController
@RequestMapping("/inquiries")
@CrossOrigin(origins = "*", maxAge = 3600)
public class InquiryController {

    @Autowired
    private InquiryService inquiryService;

    @Autowired
    private UserService userService;

    @PostMapping
    @PreAuthorize("hasRole('BUYER')")
    public ResponseEntity<?> createInquiry(@Valid @RequestBody InquiryRequest inquiryRequest,
                                          Authentication authentication) {
        try {
            User user = userService.findByEmail(authentication.getName());
            Inquiry inquiry = inquiryService.createInquiry(inquiryRequest, user.getId());
            
            return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Inquiry sent successfully", inquiry));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Failed to send inquiry: " + e.getMessage()));
        }
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getAllInquiries(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        try {
            Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
            Page<Inquiry> inquiries = inquiryService.getAllInquiries(pageable);
            
            return ResponseEntity.ok(ApiResponse.success("All inquiries retrieved successfully", inquiries));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Failed to retrieve inquiries: " + e.getMessage()));
        }
    }

    @GetMapping("/farmer")
    @PreAuthorize("hasRole('FARMER')")
    public ResponseEntity<?> getFarmerInquiries(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            Authentication authentication) {
        try {
            User user = userService.findByEmail(authentication.getName());
            Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
            Page<Inquiry> inquiries = inquiryService.getInquiriesByFarmer(user.getId(), pageable);
            
            return ResponseEntity.ok(ApiResponse.success("Your inquiries retrieved successfully", inquiries));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Failed to retrieve inquiries: " + e.getMessage()));
        }
    }

    @GetMapping("/buyer")
    @PreAuthorize("hasRole('BUYER')")
    public ResponseEntity<?> getBuyerInquiries(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            Authentication authentication) {
        try {
            User user = userService.findByEmail(authentication.getName());
            Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
            Page<Inquiry> inquiries = inquiryService.getInquiriesByBuyer(user.getId(), pageable);
            
            return ResponseEntity.ok(ApiResponse.success("Your inquiries retrieved successfully", inquiries));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Failed to retrieve your inquiries: " + e.getMessage()));
        }
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateInquiryStatus(@PathVariable Long id,
                                                @RequestParam Inquiry.Status status,
                                                Authentication authentication) {
        try {
            User user = userService.findByEmail(authentication.getName());
            Inquiry inquiry = inquiryService.updateInquiryStatus(id, status, user.getId());
            
            return ResponseEntity.ok(ApiResponse.success("Inquiry status updated successfully", inquiry));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Failed to update inquiry status: " + e.getMessage()));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getInquiryById(@PathVariable Long id, Authentication authentication) {
        try {
            Inquiry inquiry = inquiryService.findById(id);
            User user = userService.findByEmail(authentication.getName());
            
            // Check if user has permission to view this inquiry
            boolean canView = inquiry.getBuyer().getId().equals(user.getId()) ||
                             inquiry.getFruit().getFarmer().getId().equals(user.getId()) ||
                             user.getRole() == User.Role.ADMIN;
            
            if (!canView) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(ApiResponse.error("You don't have permission to view this inquiry"));
            }
            
            return ResponseEntity.ok(ApiResponse.success("Inquiry retrieved successfully", inquiry));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Inquiry not found"));
        }
    }

    @GetMapping("/status/{status}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getInquiriesByStatus(@PathVariable Inquiry.Status status,
                                                 @RequestParam(defaultValue = "0") int page,
                                                 @RequestParam(defaultValue = "10") int size) {
        try {
            Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
            Page<Inquiry> inquiries = inquiryService.getInquiriesByStatus(status, pageable);
            
            return ResponseEntity.ok(ApiResponse.success("Inquiries retrieved successfully", inquiries));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Failed to retrieve inquiries: " + e.getMessage()));
        }
    }
}
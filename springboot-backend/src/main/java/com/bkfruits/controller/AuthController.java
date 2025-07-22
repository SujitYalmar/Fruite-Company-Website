package com.bkfruits.controller;

import com.bkfruits.dto.*;
import com.bkfruits.model.User;
import com.bkfruits.security.JwtTokenProvider;
import com.bkfruits.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*", maxAge = 3600)
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody AuthRequest loginRequest) {
        try {
            // Check if user exists and has the correct role
            User user = userService.findByEmail(loginRequest.getEmail());
            if (user.getRole() != loginRequest.getRole()) {
                return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Invalid role for this user"));
            }

            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    loginRequest.getEmail(),
                    loginRequest.getPassword()
                )
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = tokenProvider.generateToken(authentication);

            AuthResponse.UserResponse userResponse = new AuthResponse.UserResponse(user);
            AuthResponse authResponse = new AuthResponse(jwt, userResponse, "Login successful");

            return ResponseEntity.ok(authResponse);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Invalid credentials"));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequest signUpRequest) {
        try {
            User user = userService.createUser(signUpRequest);
            
            String jwt = tokenProvider.generateTokenFromEmail(user.getEmail());
            
            AuthResponse.UserResponse userResponse = new AuthResponse.UserResponse(user);
            AuthResponse authResponse = new AuthResponse(jwt, userResponse, "User registered successfully");

            return ResponseEntity.status(HttpStatus.CREATED).body(authResponse);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(Authentication authentication) {
        try {
            User user = userService.findByEmail(authentication.getName());
            AuthResponse.UserResponse userResponse = new AuthResponse.UserResponse(user);
            
            return ResponseEntity.ok(ApiResponse.success("User retrieved successfully", userResponse));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("User not found"));
        }
    }
}
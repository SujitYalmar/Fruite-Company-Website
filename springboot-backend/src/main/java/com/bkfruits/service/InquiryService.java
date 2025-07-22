package com.bkfruits.service;

import com.bkfruits.dto.InquiryRequest;
import com.bkfruits.exception.ResourceNotFoundException;
import com.bkfruits.exception.UnauthorizedException;
import com.bkfruits.model.Inquiry;
import com.bkfruits.model.User;
import com.bkfruits.model.Fruit;
import com.bkfruits.repository.InquiryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class InquiryService {

    @Autowired
    private InquiryRepository inquiryRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private FruitService fruitService;

    public Inquiry createInquiry(InquiryRequest inquiryRequest, Long buyerId) {
        User buyer = userService.findById(buyerId);
        
        if (buyer.getRole() != User.Role.BUYER) {
            throw new UnauthorizedException("Only buyers can create inquiries");
        }

        Fruit fruit = fruitService.findById(inquiryRequest.getFruitId());

        Inquiry inquiry = new Inquiry();
        inquiry.setBuyer(buyer);
        inquiry.setFruit(fruit);
        inquiry.setMessage(inquiryRequest.getMessage());
        inquiry.setQuantity(inquiryRequest.getQuantity());

        return inquiryRepository.save(inquiry);
    }

    public Inquiry updateInquiryStatus(Long id, Inquiry.Status status, Long userId) {
        Inquiry inquiry = findById(id);
        User user = userService.findById(userId);
        
        // Only the farmer who owns the fruit or the buyer who made the inquiry can update status
        boolean canUpdate = inquiry.getFruit().getFarmer().getId().equals(userId) || 
                           inquiry.getBuyer().getId().equals(userId) ||
                           user.getRole() == User.Role.ADMIN;
        
        if (!canUpdate) {
            throw new UnauthorizedException("You don't have permission to update this inquiry");
        }

        inquiry.setStatus(status);
        return inquiryRepository.save(inquiry);
    }

    @Transactional(readOnly = true)
    public Inquiry findById(Long id) {
        return inquiryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Inquiry", "id", id));
    }

    @Transactional(readOnly = true)
    public List<Inquiry> getAllInquiries() {
        return inquiryRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Page<Inquiry> getAllInquiries(Pageable pageable) {
        return inquiryRepository.findAll(pageable);
    }

    @Transactional(readOnly = true)
    public List<Inquiry> getInquiriesByBuyer(Long buyerId) {
        User buyer = userService.findById(buyerId);
        return inquiryRepository.findByBuyer(buyer);
    }

    @Transactional(readOnly = true)
    public Page<Inquiry> getInquiriesByBuyer(Long buyerId, Pageable pageable) {
        User buyer = userService.findById(buyerId);
        return inquiryRepository.findByBuyer(buyer, pageable);
    }

    @Transactional(readOnly = true)
    public List<Inquiry> getInquiriesByFarmer(Long farmerId) {
        User farmer = userService.findById(farmerId);
        return inquiryRepository.findByFarmer(farmer);
    }

    @Transactional(readOnly = true)
    public Page<Inquiry> getInquiriesByFarmer(Long farmerId, Pageable pageable) {
        User farmer = userService.findById(farmerId);
        return inquiryRepository.findByFarmer(farmer, pageable);
    }

    @Transactional(readOnly = true)
    public List<Inquiry> getInquiriesByFruit(Long fruitId) {
        Fruit fruit = fruitService.findById(fruitId);
        return inquiryRepository.findByFruit(fruit);
    }

    @Transactional(readOnly = true)
    public List<Inquiry> getInquiriesByStatus(Inquiry.Status status) {
        return inquiryRepository.findByStatus(status);
    }

    @Transactional(readOnly = true)
    public Page<Inquiry> getInquiriesByStatus(Inquiry.Status status, Pageable pageable) {
        return inquiryRepository.findByStatus(status, pageable);
    }

    @Transactional(readOnly = true)
    public List<Inquiry> getInquiriesByBuyerAndStatus(Long buyerId, Inquiry.Status status) {
        User buyer = userService.findById(buyerId);
        return inquiryRepository.findByBuyerAndStatus(buyer, status);
    }

    @Transactional(readOnly = true)
    public List<Inquiry> getInquiriesByFarmerAndStatus(Long farmerId, Inquiry.Status status) {
        User farmer = userService.findById(farmerId);
        return inquiryRepository.findByFarmerAndStatus(farmer, status);
    }

    @Transactional(readOnly = true)
    public long getInquiryCountByFarmer(Long farmerId) {
        User farmer = userService.findById(farmerId);
        return inquiryRepository.countByFarmer(farmer);
    }

    @Transactional(readOnly = true)
    public long getInquiryCountByBuyer(Long buyerId) {
        User buyer = userService.findById(buyerId);
        return inquiryRepository.countByBuyer(buyer);
    }

    @Transactional(readOnly = true)
    public long getInquiryCountByStatus(Inquiry.Status status) {
        return inquiryRepository.countByStatus(status);
    }
}
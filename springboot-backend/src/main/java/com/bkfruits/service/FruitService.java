package com.bkfruits.service;

import com.bkfruits.dto.FruitRequest;
import com.bkfruits.exception.ResourceNotFoundException;
import com.bkfruits.exception.UnauthorizedException;
import com.bkfruits.model.Fruit;
import com.bkfruits.model.User;
import com.bkfruits.repository.FruitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

@Service
@Transactional
public class FruitService {

    @Autowired
    private FruitRepository fruitRepository;

    @Autowired
    private UserService userService;

    public Fruit createFruit(FruitRequest fruitRequest, Long farmerId) {
        User farmer = userService.findById(farmerId);
        
        if (farmer.getRole() != User.Role.FARMER) {
            throw new UnauthorizedException("Only farmers can create fruit listings");
        }

        Fruit fruit = new Fruit();
        fruit.setName(fruitRequest.getName());
        fruit.setType(fruitRequest.getType());
        fruit.setQuantity(fruitRequest.getQuantity());
        fruit.setPrice(fruitRequest.getPrice());
        fruit.setLocation(fruitRequest.getLocation());
        fruit.setFarmer(farmer);
        fruit.setImage(fruitRequest.getImage());
        fruit.setDescription(fruitRequest.getDescription());
        fruit.setHarvestDate(fruitRequest.getHarvestDate());

        return fruitRepository.save(fruit);
    }

    public Fruit updateFruit(Long id, FruitRequest fruitRequest, Long farmerId) {
        Fruit fruit = findById(id);
        
        if (!fruit.getFarmer().getId().equals(farmerId)) {
            throw new UnauthorizedException("You can only update your own fruit listings");
        }

        fruit.setName(fruitRequest.getName());
        fruit.setType(fruitRequest.getType());
        fruit.setQuantity(fruitRequest.getQuantity());
        fruit.setPrice(fruitRequest.getPrice());
        fruit.setLocation(fruitRequest.getLocation());
        fruit.setImage(fruitRequest.getImage());
        fruit.setDescription(fruitRequest.getDescription());
        fruit.setHarvestDate(fruitRequest.getHarvestDate());

        return fruitRepository.save(fruit);
    }

    public void deleteFruit(Long id, Long farmerId) {
        Fruit fruit = findById(id);
        
        if (!fruit.getFarmer().getId().equals(farmerId)) {
            throw new UnauthorizedException("You can only delete your own fruit listings");
        }

        fruitRepository.delete(fruit);
    }

    @Transactional(readOnly = true)
    public Fruit findById(Long id) {
        return fruitRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Fruit", "id", id));
    }

    @Transactional(readOnly = true)
    public List<Fruit> getAllFruits() {
        return fruitRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Page<Fruit> getAllFruits(Pageable pageable) {
        return fruitRepository.findAll(pageable);
    }

    @Transactional(readOnly = true)
    public Page<Fruit> getFruitsWithFilters(String type, String location, BigDecimal minPrice, 
                                          BigDecimal maxPrice, Fruit.Status status, 
                                          String keyword, Pageable pageable) {
        return fruitRepository.findWithFilters(type, location, minPrice, maxPrice, status, keyword, pageable);
    }

    @Transactional(readOnly = true)
    public List<Fruit> getFruitsByFarmer(Long farmerId) {
        User farmer = userService.findById(farmerId);
        return fruitRepository.findByFarmer(farmer);
    }

    @Transactional(readOnly = true)
    public Page<Fruit> getFruitsByFarmer(Long farmerId, Pageable pageable) {
        User farmer = userService.findById(farmerId);
        return fruitRepository.findByFarmer(farmer, pageable);
    }

    @Transactional(readOnly = true)
    public List<Fruit> getFruitsByStatus(Fruit.Status status) {
        return fruitRepository.findByStatus(status);
    }

    @Transactional(readOnly = true)
    public List<Fruit> getFruitsByType(String type) {
        return fruitRepository.findByType(type);
    }

    @Transactional(readOnly = true)
    public List<Fruit> getFruitsByLocation(String location) {
        return fruitRepository.findByLocationContaining(location);
    }

    @Transactional(readOnly = true)
    public List<Fruit> getFruitsByPriceRange(BigDecimal minPrice, BigDecimal maxPrice) {
        return fruitRepository.findByPriceBetween(minPrice, maxPrice);
    }

    @Transactional(readOnly = true)
    public List<String> getDistinctTypes() {
        return fruitRepository.findDistinctTypes();
    }

    @Transactional(readOnly = true)
    public List<String> getDistinctLocations() {
        return fruitRepository.findDistinctLocations();
    }

    @Transactional(readOnly = true)
    public Page<Fruit> searchFruits(String keyword, Pageable pageable) {
        return fruitRepository.findByNameContainingOrDescriptionContaining(keyword, pageable);
    }

    public Fruit updateFruitStatus(Long id, Fruit.Status status, Long farmerId) {
        Fruit fruit = findById(id);
        
        if (!fruit.getFarmer().getId().equals(farmerId)) {
            throw new UnauthorizedException("You can only update your own fruit listings");
        }

        fruit.setStatus(status);
        return fruitRepository.save(fruit);
    }

    @Transactional(readOnly = true)
    public Map<String, Object> getFarmerStats(Long farmerId) {
        User farmer = userService.findById(farmerId);
        
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalListings", fruitRepository.findByFarmer(farmer).size());
        stats.put("activeListings", fruitRepository.countByFarmerAndStatus(farmer, Fruit.Status.AVAILABLE));
        stats.put("potentialRevenue", fruitRepository.calculatePotentialRevenueByFarmer(farmer));
        stats.put("averagePrice", fruitRepository.calculateAveragePriceByFarmer(farmer));
        
        return stats;
    }

    @Transactional(readOnly = true)
    public List<Fruit> getFruitsByHarvestDateRange(LocalDate startDate, LocalDate endDate) {
        return fruitRepository.findByHarvestDateBetween(startDate, endDate);
    }
}
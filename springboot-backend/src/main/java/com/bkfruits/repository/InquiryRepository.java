package com.bkfruits.repository;

import com.bkfruits.model.Inquiry;
import com.bkfruits.model.User;
import com.bkfruits.model.Fruit;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InquiryRepository extends JpaRepository<Inquiry, Long> {
    
    List<Inquiry> findByBuyer(User buyer);
    
    Page<Inquiry> findByBuyer(User buyer, Pageable pageable);
    
    List<Inquiry> findByFruit(Fruit fruit);
    
    @Query("SELECT i FROM Inquiry i WHERE i.fruit.farmer = :farmer")
    List<Inquiry> findByFarmer(@Param("farmer") User farmer);
    
    @Query("SELECT i FROM Inquiry i WHERE i.fruit.farmer = :farmer")
    Page<Inquiry> findByFarmer(@Param("farmer") User farmer, Pageable pageable);
    
    List<Inquiry> findByStatus(Inquiry.Status status);
    
    Page<Inquiry> findByStatus(Inquiry.Status status, Pageable pageable);
    
    @Query("SELECT i FROM Inquiry i WHERE i.buyer = :buyer AND i.status = :status")
    List<Inquiry> findByBuyerAndStatus(@Param("buyer") User buyer, 
                                      @Param("status") Inquiry.Status status);
    
    @Query("SELECT i FROM Inquiry i WHERE i.fruit.farmer = :farmer AND i.status = :status")
    List<Inquiry> findByFarmerAndStatus(@Param("farmer") User farmer, 
                                       @Param("status") Inquiry.Status status);
    
    @Query("SELECT COUNT(i) FROM Inquiry i WHERE i.fruit.farmer = :farmer")
    long countByFarmer(@Param("farmer") User farmer);
    
    @Query("SELECT COUNT(i) FROM Inquiry i WHERE i.buyer = :buyer")
    long countByBuyer(@Param("buyer") User buyer);
    
    @Query("SELECT COUNT(i) FROM Inquiry i WHERE i.status = :status")
    long countByStatus(@Param("status") Inquiry.Status status);
}
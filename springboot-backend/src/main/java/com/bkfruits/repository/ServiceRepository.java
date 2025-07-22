package com.bkfruits.repository;

import com.bkfruits.model.Service;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServiceRepository extends JpaRepository<Service, Long> {
    
    @Query("SELECT s FROM Service s WHERE s.title LIKE %:keyword% OR s.description LIKE %:keyword%")
    List<Service> findByTitleContainingOrDescriptionContaining(@Param("keyword") String keyword);
    
    List<Service> findByTitleContaining(String title);
}
package com.bkfruits.repository;

import com.bkfruits.model.Fruit;
import com.bkfruits.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface FruitRepository extends JpaRepository<Fruit, Long> {
    
    List<Fruit> findByFarmer(User farmer);
    
    Page<Fruit> findByFarmer(User farmer, Pageable pageable);
    
    List<Fruit> findByStatus(Fruit.Status status);
    
    Page<Fruit> findByStatus(Fruit.Status status, Pageable pageable);
    
    List<Fruit> findByType(String type);
    
    Page<Fruit> findByType(String type, Pageable pageable);
    
    @Query("SELECT f FROM Fruit f WHERE f.location LIKE %:location%")
    List<Fruit> findByLocationContaining(@Param("location") String location);
    
    @Query("SELECT f FROM Fruit f WHERE f.price BETWEEN :minPrice AND :maxPrice")
    List<Fruit> findByPriceBetween(@Param("minPrice") BigDecimal minPrice, 
                                  @Param("maxPrice") BigDecimal maxPrice);
    
    @Query("SELECT f FROM Fruit f WHERE f.name LIKE %:keyword% OR f.description LIKE %:keyword%")
    Page<Fruit> findByNameContainingOrDescriptionContaining(@Param("keyword") String keyword, 
                                                           Pageable pageable);
    
    @Query("SELECT f FROM Fruit f WHERE " +
           "(:type IS NULL OR f.type = :type) AND " +
           "(:location IS NULL OR f.location LIKE %:location%) AND " +
           "(:minPrice IS NULL OR f.price >= :minPrice) AND " +
           "(:maxPrice IS NULL OR f.price <= :maxPrice) AND " +
           "(:status IS NULL OR f.status = :status) AND " +
           "(:keyword IS NULL OR f.name LIKE %:keyword% OR f.description LIKE %:keyword%)")
    Page<Fruit> findWithFilters(@Param("type") String type,
                               @Param("location") String location,
                               @Param("minPrice") BigDecimal minPrice,
                               @Param("maxPrice") BigDecimal maxPrice,
                               @Param("status") Fruit.Status status,
                               @Param("keyword") String keyword,
                               Pageable pageable);
    
    @Query("SELECT DISTINCT f.type FROM Fruit f ORDER BY f.type")
    List<String> findDistinctTypes();
    
    @Query("SELECT DISTINCT f.location FROM Fruit f ORDER BY f.location")
    List<String> findDistinctLocations();
    
    @Query("SELECT COUNT(f) FROM Fruit f WHERE f.farmer = :farmer AND f.status = :status")
    long countByFarmerAndStatus(@Param("farmer") User farmer, @Param("status") Fruit.Status status);
    
    @Query("SELECT SUM(f.price * f.quantity) FROM Fruit f WHERE f.farmer = :farmer")
    BigDecimal calculatePotentialRevenueByFarmer(@Param("farmer") User farmer);
    
    @Query("SELECT AVG(f.price) FROM Fruit f WHERE f.farmer = :farmer")
    BigDecimal calculateAveragePriceByFarmer(@Param("farmer") User farmer);
    
    List<Fruit> findByHarvestDateBetween(LocalDate startDate, LocalDate endDate);
}
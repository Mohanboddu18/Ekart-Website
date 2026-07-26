package com.ekart.repository;

import com.ekart.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByNameContainingIgnoreCaseOrBrandContainingIgnoreCaseOrCategoryContainingIgnoreCase(
            String name, String brand, String category
    );
    List<Product> findByBrandIgnoreCase(String brand);
    List<Product> findByCategoryIgnoreCase(String category);
}

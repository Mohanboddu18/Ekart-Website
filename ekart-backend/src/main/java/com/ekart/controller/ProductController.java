package com.ekart.controller;

import com.ekart.dto.ApiResponse;
import com.ekart.model.Product;
import com.ekart.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Product>>> getAllProducts() {
        List<Product> products = productRepository.findAll();
        return ResponseEntity.ok(ApiResponse.<List<Product>>builder()
                .success(true)
                .message("Products retrieved successfully")
                .data(products)
                .build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Product>> getProductById(@PathVariable Long id) {
        return productRepository.findById(id)
                .map(product -> ResponseEntity.ok(ApiResponse.<Product>builder()
                        .success(true)
                        .message("Product details found")
                        .data(product)
                        .build()))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<Product>>> searchProducts(@RequestParam(required = false, defaultValue = "") String query) {
        List<Product> products;
        if (query.trim().isEmpty()) {
            products = productRepository.findAll();
        } else {
            products = productRepository.findByNameContainingIgnoreCaseOrBrandContainingIgnoreCaseOrCategoryContainingIgnoreCase(query, query, query);
        }
        return ResponseEntity.ok(ApiResponse.<List<Product>>builder()
                .success(true)
                .message("Search results retrieved")
                .data(products)
                .build());
    }
}

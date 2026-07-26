package com.ekart.controller;

import com.ekart.dto.ApiResponse;
import com.ekart.model.OrderTrack;
import com.ekart.repository.OrderTrackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
public class OrderTrackerController {

    @Autowired
    private OrderTrackRepository orderTrackRepository;

    @GetMapping("/track/{orderId}")
    public ResponseEntity<ApiResponse<OrderTrack>> trackOrder(@PathVariable String orderId) {
        return orderTrackRepository.findByOrderIdIgnoreCase(orderId)
                .map(order -> ResponseEntity.ok(ApiResponse.<OrderTrack>builder()
                        .success(true)
                        .message("Order tracking details found")
                        .data(order)
                        .build()))
                .orElse(ResponseEntity.status(404).body(ApiResponse.<OrderTrack>builder()
                        .success(false)
                        .message("Order ID '" + orderId + "' not found. Please check your order ID.")
                        .build()));
    }

    @GetMapping("/my-orders")
    public ResponseEntity<ApiResponse<List<OrderTrack>>> getMyOrders(@RequestParam String email) {
        List<OrderTrack> orders = orderTrackRepository.findByCustomerEmailIgnoreCase(email);
        return ResponseEntity.ok(ApiResponse.<List<OrderTrack>>builder()
                .success(true)
                .message("User orders retrieved")
                .data(orders)
                .build());
    }
}

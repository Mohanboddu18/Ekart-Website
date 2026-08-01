package com.ekart.controller;

import com.ekart.dto.ApiResponse;
import com.ekart.dto.DeliveryPickupRequest;
import com.ekart.dto.OrderCreateRequest;
import com.ekart.dto.OrderStatusUpdateRequest;
import com.ekart.model.OrderNotification;
import com.ekart.model.OrderTrack;
import com.ekart.repository.OrderNotificationRepository;
import com.ekart.repository.OrderTrackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Random;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
public class OrderTrackerController {

    @Autowired
    private OrderTrackRepository orderTrackRepository;

    @Autowired
    private OrderNotificationRepository notificationRepository;

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

    @PostMapping("/create")
    public ResponseEntity<ApiResponse<OrderTrack>> createOrder(@RequestBody OrderCreateRequest request) {
        try {
            String generatedOrderId = "EK" + (1000 + new Random().nextInt(9000));
            String generatedTracking = "TRK-" + (1000000 + new Random().nextInt(9000000));
            // EXACT 7-DAY GUARANTEED EXPECTED DELIVERY
            String estimatedDelivery = LocalDateTime.now().plusDays(7).format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));

            OrderTrack newOrder = OrderTrack.builder()
                    .orderId(generatedOrderId)
                    .trackingNumber(generatedTracking)
                    .customerEmail(request.getCustomerEmail() != null ? request.getCustomerEmail() : "customer@ekart.com")
                    .customerName(request.getCustomerName() != null ? request.getCustomerName() : "Valued Customer")
                    .shippingAddress(request.getShippingAddress() != null ? request.getShippingAddress() : "Address not provided")
                    .totalAmount(request.getTotalAmount() != null ? request.getTotalAmount() : 0.0)
                    .status("ORDER_RECEIVED")
                    .carrier("eKart Express Logistics")
                    .estimatedDelivery(estimatedDelivery)
                    .orderDate(LocalDateTime.now())
                    .build();

            OrderTrack saved = orderTrackRepository.save(newOrder);

            // Save notifications safely
            try {
                // 1. Send notification to ADMIN
                notificationRepository.save(OrderNotification.builder()
                        .orderId(generatedOrderId)
                        .senderRole("CUSTOMER")
                        .recipientRole("ROLE_ADMIN")
                        .title("New Order Placed")
                        .message("New order #" + generatedOrderId + " placed by " + request.getCustomerName() + " (₹" + request.getTotalAmount() + "). Expected Delivery: " + estimatedDelivery + ". Waiting for admin acceptance.")
                        .isRead(false)
                        .timestamp(LocalDateTime.now())
                        .build());

                // 2. Send notification to CUSTOMER
                notificationRepository.save(OrderNotification.builder()
                        .orderId(generatedOrderId)
                        .senderRole("SYSTEM")
                        .recipientRole("CUSTOMER")
                        .recipientEmail(request.getCustomerEmail())
                        .title("Order Placed Successfully")
                        .message("Your order #" + generatedOrderId + " has been placed successfully! Expected Delivery Date: " + estimatedDelivery + " (7-Day Guarantee). Status: ORDER_RECEIVED.")
                        .isRead(false)
                        .timestamp(LocalDateTime.now())
                        .build());
            } catch (Exception notifEx) {
                System.err.println("Notification save warning: " + notifEx.getMessage());
            }

            return ResponseEntity.ok(ApiResponse.<OrderTrack>builder()
                    .success(true)
                    .message("Order placed successfully!")
                    .data(saved)
                    .build());

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(ApiResponse.<OrderTrack>builder()
                    .success(false)
                    .message("Failed to store order in database: " + e.getMessage())
                    .build());
        }
    }

    @GetMapping("/admin/all")
    public ResponseEntity<ApiResponse<List<OrderTrack>>> getAllOrdersAdmin() {
        List<OrderTrack> allOrders = orderTrackRepository.findAll();
        allOrders.sort((a, b) -> {
            if (a.getOrderDate() == null) return 1;
            if (b.getOrderDate() == null) return -1;
            return b.getOrderDate().compareTo(a.getOrderDate());
        });

        return ResponseEntity.ok(ApiResponse.<List<OrderTrack>>builder()
                .success(true)
                .message("All customer orders retrieved for Admin")
                .data(allOrders)
                .build());
    }

    @PutMapping("/admin/update-status/{orderId}")
    public ResponseEntity<ApiResponse<OrderTrack>> updateOrderStatus(
            @PathVariable String orderId,
            @RequestBody OrderStatusUpdateRequest request) {

        return orderTrackRepository.findByOrderIdIgnoreCase(orderId)
                .map(order -> {
                    String newStatus = request.getStatus();
                    if (newStatus != null && !newStatus.isEmpty()) {
                        order.setStatus(newStatus);
                    }
                    if (request.getCarrier() != null && !request.getCarrier().isEmpty()) {
                        order.setCarrier(request.getCarrier());
                    }
                    if (request.getTrackingNumber() != null && !request.getTrackingNumber().isEmpty()) {
                        order.setTrackingNumber(request.getTrackingNumber());
                    }
                    if (request.getEstimatedDelivery() != null && !request.getEstimatedDelivery().isEmpty()) {
                        order.setEstimatedDelivery(request.getEstimatedDelivery());
                    }

                    OrderTrack updated = orderTrackRepository.save(order);

                    // TRIGGER NOTIFICATIONS BASED ON ADMIN ACTION
                    if ("ACCEPTED".equalsIgnoreCase(newStatus)) {
                        // Admin accepts order -> notify Delivery Boy to pick up at store
                        notificationRepository.save(OrderNotification.builder()
                                .orderId(orderId)
                                .senderRole("ADMIN")
                                .recipientRole("ROLE_DELIVERY")
                                .title("Order Accepted - Ready for Store Pickup")
                                .message("Order #" + orderId + " has been accepted by Admin! Please pick up the order package at the store.")
                                .isRead(false)
                                .timestamp(LocalDateTime.now())
                                .build());

                        // Also notify customer
                        notificationRepository.save(OrderNotification.builder()
                                .orderId(orderId)
                                .senderRole("ADMIN")
                                .recipientRole("CUSTOMER")
                                .recipientEmail(order.getCustomerEmail())
                                .title("Order Accepted")
                                .message("Your order #" + orderId + " has been ACCEPTED by Admin and prepared for store pickup. Expected Delivery: " + order.getEstimatedDelivery())
                                .isRead(false)
                                .timestamp(LocalDateTime.now())
                                .build());
                    }

                    return ResponseEntity.ok(ApiResponse.<OrderTrack>builder()
                            .success(true)
                            .message("Order status updated successfully!")
                            .data(updated)
                            .build());
                })
                .orElse(ResponseEntity.status(404).body(ApiResponse.<OrderTrack>builder()
                        .success(false)
                        .message("Order ID '" + orderId + "' not found.")
                        .build()));
    }

    // DELIVERY BOY ENDPOINTS
    @GetMapping("/delivery/available")
    public ResponseEntity<ApiResponse<List<OrderTrack>>> getDeliveryOrders() {
        List<OrderTrack> allOrders = orderTrackRepository.findAll();
        allOrders.sort((a, b) -> {
            if (a.getOrderDate() == null) return 1;
            if (b.getOrderDate() == null) return -1;
            return b.getOrderDate().compareTo(a.getOrderDate());
        });

        return ResponseEntity.ok(ApiResponse.<List<OrderTrack>>builder()
                .success(true)
                .message("Delivery orders retrieved")
                .data(allOrders)
                .build());
    }

    @PutMapping("/delivery/pickup/{orderId}")
    public ResponseEntity<ApiResponse<OrderTrack>> pickupOrder(
            @PathVariable String orderId,
            @RequestBody DeliveryPickupRequest request) {

        return orderTrackRepository.findByOrderIdIgnoreCase(orderId)
                .map(order -> {
                    // STORE PICKUP COMPLETE -> SET STATUS TO SHIPPED
                    order.setStatus("SHIPPED");
                    String agentName = (request.getDeliveryBoyName() != null && !request.getDeliveryBoyName().isEmpty())
                            ? request.getDeliveryBoyName()
                            : "Delivery Executive";

                    order.setDeliveryBoyName(agentName);
                    if (request.getDeliveryBoyPhone() != null && !request.getDeliveryBoyPhone().isEmpty()) {
                        order.setDeliveryBoyPhone(request.getDeliveryBoyPhone());
                    }

                    OrderTrack updated = orderTrackRepository.save(order);

                    // 1. Notify Customer that order was picked up from store
                    notificationRepository.save(OrderNotification.builder()
                            .orderId(orderId)
                            .senderRole("DELIVERY")
                            .recipientRole("CUSTOMER")
                            .recipientEmail(order.getCustomerEmail())
                            .title("Store Pickup Complete")
                            .message("Your order #" + orderId + " has been picked up from store by Delivery Agent " + agentName + ". Status: Handed to Delivery Store. Expected Delivery: " + order.getEstimatedDelivery())
                            .isRead(false)
                            .timestamp(LocalDateTime.now())
                            .build());

                    // 2. Notify Admin that store pickup is complete
                    notificationRepository.save(OrderNotification.builder()
                            .orderId(orderId)
                            .senderRole("DELIVERY")
                            .recipientRole("ROLE_ADMIN")
                            .title("Store Pickup Complete")
                            .message("Delivery Agent " + agentName + " picked up Order #" + orderId + " from store.")
                            .isRead(false)
                            .timestamp(LocalDateTime.now())
                            .build());

                    return ResponseEntity.ok(ApiResponse.<OrderTrack>builder()
                            .success(true)
                            .message("Order picked up from store successfully!")
                            .data(updated)
                            .build());
                })
                .orElse(ResponseEntity.status(404).body(ApiResponse.<OrderTrack>builder()
                        .success(false)
                        .message("Order ID '" + orderId + "' not found.")
                        .build()));
    }

    @PutMapping("/delivery/out-for-delivery/{orderId}")
    public ResponseEntity<ApiResponse<OrderTrack>> acceptOutForDelivery(
            @PathVariable String orderId,
            @RequestBody DeliveryPickupRequest request) {

        return orderTrackRepository.findByOrderIdIgnoreCase(orderId)
                .map(order -> {
                    order.setStatus("OUT_FOR_DELIVERY");
                    String agentName = (order.getDeliveryBoyName() != null && !order.getDeliveryBoyName().isEmpty())
                            ? order.getDeliveryBoyName()
                            : (request.getDeliveryBoyName() != null ? request.getDeliveryBoyName() : "Delivery Executive");

                    order.setDeliveryBoyName(agentName);
                    OrderTrack updated = orderTrackRepository.save(order);

                    // 1. Notify Customer that Delivery Agent accepted dispatch and is reaching home address
                    notificationRepository.save(OrderNotification.builder()
                            .orderId(orderId)
                            .senderRole("DELIVERY")
                            .recipientRole("CUSTOMER")
                            .recipientEmail(order.getCustomerEmail())
                            .title("Out for Delivery")
                            .message("Your order #" + orderId + " is OUT FOR DELIVERY! Delivery Executive " + agentName + " has accepted dispatch and is reaching your delivery address.")
                            .isRead(false)
                            .timestamp(LocalDateTime.now())
                            .build());

                    // 2. Notify Admin that Delivery Agent accepted Out for Delivery
                    notificationRepository.save(OrderNotification.builder()
                            .orderId(orderId)
                            .senderRole("DELIVERY")
                            .recipientRole("ROLE_ADMIN")
                            .title("Out for Delivery Accepted")
                            .message("Delivery Executive " + agentName + " accepted Out for Delivery dispatch for Order #" + orderId + ".")
                            .isRead(false)
                            .timestamp(LocalDateTime.now())
                            .build());

                    return ResponseEntity.ok(ApiResponse.<OrderTrack>builder()
                            .success(true)
                            .message("Out for delivery status accepted and broadcasted successfully!")
                            .data(updated)
                            .build());
                })
                .orElse(ResponseEntity.status(404).body(ApiResponse.<OrderTrack>builder()
                        .success(false)
                        .message("Order ID '" + orderId + "' not found.")
                        .build()));
    }

    @PutMapping("/delivery/complete/{orderId}")
    public ResponseEntity<ApiResponse<OrderTrack>> completeDelivery(@PathVariable String orderId) {
        return orderTrackRepository.findByOrderIdIgnoreCase(orderId)
                .map(order -> {
                    order.setStatus("DELIVERED");
                    OrderTrack updated = orderTrackRepository.save(order);

                    String agentName = order.getDeliveryBoyName() != null ? order.getDeliveryBoyName() : "Delivery Executive";

                    // 1. Notify Customer that order was DELIVERED to home
                    notificationRepository.save(OrderNotification.builder()
                            .orderId(orderId)
                            .senderRole("DELIVERY")
                            .recipientRole("CUSTOMER")
                            .recipientEmail(order.getCustomerEmail())
                            .title("Order Delivered Successfully")
                            .message("Your order #" + orderId + " has been DELIVERED to your home by " + agentName + "! Thank you for shopping with eKart.")
                            .isRead(false)
                            .timestamp(LocalDateTime.now())
                            .build());

                    // 2. Notify Admin that delivery is complete
                    notificationRepository.save(OrderNotification.builder()
                            .orderId(orderId)
                            .senderRole("DELIVERY")
                            .recipientRole("ROLE_ADMIN")
                            .title("Home Delivery Complete")
                            .message("Order #" + orderId + " successfully delivered to Customer " + order.getCustomerName() + " at home by " + agentName + ".")
                            .isRead(false)
                            .timestamp(LocalDateTime.now())
                            .build());

                    return ResponseEntity.ok(ApiResponse.<OrderTrack>builder()
                            .success(true)
                            .message("Order successfully delivered to customer home!")
                            .data(updated)
                            .build());
                })
                .orElse(ResponseEntity.status(404).body(ApiResponse.<OrderTrack>builder()
                        .success(false)
                        .message("Order ID '" + orderId + "' not found.")
                        .build()));
    }

    // NOTIFICATION ENDPOINTS
    @GetMapping("/notifications")
    public ResponseEntity<ApiResponse<List<OrderNotification>>> getNotifications(
            @RequestParam(required = false) String role,
            @RequestParam(required = false) String email) {

        List<OrderNotification> list;
        if (email != null && !email.trim().isEmpty()) {
            list = notificationRepository.findByRecipientRoleIgnoreCaseOrRecipientEmailIgnoreCaseOrderByTimestampDesc(role != null ? role : "", email.trim());
        } else if (role != null && !role.trim().isEmpty()) {
            list = notificationRepository.findByRecipientRoleIgnoreCaseOrderByTimestampDesc(role.trim());
        } else {
            list = notificationRepository.findAll();
            list.sort((a, b) -> b.getTimestamp().compareTo(a.getTimestamp()));
        }

        return ResponseEntity.ok(ApiResponse.<List<OrderNotification>>builder()
                .success(true)
                .message("Notifications retrieved")
                .data(list)
                .build());
    }

    @GetMapping("/notifications/{orderId}")
    public ResponseEntity<ApiResponse<List<OrderNotification>>> getOrderActivityHistory(@PathVariable String orderId) {
        List<OrderNotification> history = notificationRepository.findByOrderIdIgnoreCaseOrderByTimestampAsc(orderId);
        return ResponseEntity.ok(ApiResponse.<List<OrderNotification>>builder()
                .success(true)
                .message("Order activity history retrieved")
                .data(history)
                .build());
    }
}

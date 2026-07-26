package com.ekart.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "order_tracks")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderTrack {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String orderId; // e.g. EK1001

    private String trackingNumber;

    private String customerEmail;

    private String customerName;

    private String status; // SHIPPED, IN_TRANSIT, DELIVERED, PROCESSING

    private String carrier;

    private String estimatedDelivery;

    private String shippingAddress;

    private Double totalAmount;

    private LocalDateTime orderDate;
}

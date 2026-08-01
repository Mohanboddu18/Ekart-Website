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
    @Column(name = "order_id", length = 20, nullable = false)
    private String orderId; // e.g. EK1001 (Primary Key)

    @Column(name = "tracking_number", length = 50, nullable = false, unique = true)
    private String trackingNumber;

    @Column(name = "customer_email", length = 255, nullable = false)
    private String customerEmail;

    @Column(name = "customer_name", length = 100, nullable = false)
    private String customerName;

    @Column(name = "status", length = 30, nullable = false)
    private String status; // SHIPPED, IN_TRANSIT, DELIVERED, ORDER_RECEIVED, ACCEPTED, OUT_FOR_DELIVERY

    @Column(name = "carrier", length = 100, nullable = false)
    private String carrier;

    @Column(name = "estimated_delivery")
    private String estimatedDelivery;

    @Column(name = "shipping_address", length = 500)
    private String shippingAddress;

    @Column(name = "total_amount", nullable = false)
    private Double totalAmount;

    @Column(name = "order_date", nullable = false)
    private LocalDateTime orderDate;

    @Column(name = "delivery_boy_name", length = 100)
    private String deliveryBoyName;

    @Column(name = "delivery_boy_phone", length = 20)
    private String deliveryBoyPhone;
}

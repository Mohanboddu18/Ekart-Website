package com.ekart.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderStatusUpdateRequest {
    private String status; // ACCEPTED, SHIPPED, OUT_FOR_DELIVERY, DELIVERED
    private String carrier;
    private String trackingNumber;
    private String estimatedDelivery;
}

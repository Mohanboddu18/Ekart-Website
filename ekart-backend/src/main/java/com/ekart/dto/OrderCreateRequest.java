package com.ekart.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderCreateRequest {
    private String customerEmail;
    private String customerName;
    private String shippingAddress;
    private Double totalAmount;
}

package com.ekart.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DeliveryPickupRequest {
    private String deliveryBoyName;
    private String deliveryBoyPhone;
}

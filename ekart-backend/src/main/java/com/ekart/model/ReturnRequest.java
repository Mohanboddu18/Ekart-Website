package com.ekart.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "return_requests")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReturnRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String returnId; // e.g. RET-59281

    private String orderId;

    private String userEmail;

    private String requestType; // EXCHANGE or RETURN

    private String reason;

    private String itemDetails;

    private String status; // PENDING, APPROVED, PICKUP_SCHEDULED, COMPLETED

    private LocalDateTime createdAt;
}

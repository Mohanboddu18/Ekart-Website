package com.ekart.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "order_notifications")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderNotification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "order_id", length = 20, nullable = false)
    private String orderId;

    @Column(name = "sender_role", length = 50)
    private String senderRole;

    @Column(name = "recipient_role", length = 50)
    private String recipientRole;

    @Column(name = "recipient_email", length = 255)
    private String recipientEmail;

    @Column(name = "title", length = 255)
    private String title;

    @Column(name = "message", length = 1000, nullable = false)
    private String message;

    @Column(name = "is_read")
    private Boolean isRead;

    @Column(name = "timestamp")
    private LocalDateTime timestamp;
}

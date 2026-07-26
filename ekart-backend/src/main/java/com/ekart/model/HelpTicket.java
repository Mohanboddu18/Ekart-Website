package com.ekart.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "help_tickets")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HelpTicket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String email;

    private String category; // Shipping, Payment, Account, General

    private String subject;

    @Column(length = 2000)
    private String message;

    private String status; // OPEN, IN_PROGRESS, RESOLVED

    private LocalDateTime createdAt;
}

package com.ekart.controller;

import com.ekart.dto.ApiResponse;
import com.ekart.model.HelpTicket;
import com.ekart.repository.HelpTicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequestMapping("/api/help")
@CrossOrigin(origins = "*")
public class HelpController {

    @Autowired
    private HelpTicketRepository helpTicketRepository;

    @GetMapping("/faqs")
    public ResponseEntity<ApiResponse<List<Map<String, String>>>> getFaqs() {
        List<Map<String, String>> faqs = Arrays.asList(
            Map.of("question", "How long does shipping take?", "answer", "Standard shipping takes 3-5 business days. Express shipping delivers within 24-48 hours.", "category", "Shipping"),
            Map.of("question", "What is the return policy?", "answer", "We offer a 30-day hassle-free return and exchange policy for all unworn items in original packaging.", "category", "Returns"),
            Map.of("question", "How can I track my order?", "answer", "Use our Order Tracker page with your Order ID (e.g. EK1001) to get real-time tracking updates.", "category", "Orders"),
            Map.of("question", "What payment methods are accepted?", "answer", "We accept Credit/Debit Cards, Net Banking, UPI (Google Pay, PhonePe, Paytm), and Cash on Delivery.", "category", "Payment"),
            Map.of("question", "How do I exchange an item for a different size?", "answer", "Visit the Exchange & Return section in the top menu, enter your Order ID, select Exchange, and choose your preferred size.", "category", "Returns")
        );

        return ResponseEntity.ok(ApiResponse.<List<Map<String, String>>>builder()
                .success(true)
                .message("FAQs fetched successfully")
                .data(faqs)
                .build());
    }

    @PostMapping("/submit")
    public ResponseEntity<ApiResponse<HelpTicket>> submitTicket(@RequestBody HelpTicket ticket) {
        ticket.setStatus("OPEN");
        ticket.setCreatedAt(LocalDateTime.now());
        HelpTicket saved = helpTicketRepository.save(ticket);

        return ResponseEntity.ok(ApiResponse.<HelpTicket>builder()
                .success(true)
                .message("Support ticket created successfully! Ticket ID: #" + saved.getId())
                .data(saved)
                .build());
    }
}

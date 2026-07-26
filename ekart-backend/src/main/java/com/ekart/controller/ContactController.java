package com.ekart.controller;

import com.ekart.dto.ApiResponse;
import com.ekart.model.ContactMessage;
import com.ekart.repository.ContactMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "*")
public class ContactController {

    @Autowired
    private ContactMessageRepository contactMessageRepository;

    @PostMapping("/submit")
    public ResponseEntity<ApiResponse<ContactMessage>> submitContact(@RequestBody ContactMessage message) {
        message.setCreatedAt(LocalDateTime.now());
        ContactMessage saved = contactMessageRepository.save(message);

        return ResponseEntity.ok(ApiResponse.<ContactMessage>builder()
                .success(true)
                .message("Thank you for reaching out! Your message has been received. Our team will contact you shortly.")
                .data(saved)
                .build());
    }
}

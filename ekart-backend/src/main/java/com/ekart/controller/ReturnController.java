package com.ekart.controller;

import com.ekart.dto.ApiResponse;
import com.ekart.model.ReturnRequest;
import com.ekart.repository.ReturnRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/returns")
@CrossOrigin(origins = "*")
public class ReturnController {

    @Autowired
    private ReturnRequestRepository returnRequestRepository;

    @PostMapping("/submit")
    public ResponseEntity<ApiResponse<ReturnRequest>> submitReturn(@RequestBody ReturnRequest request) {
        String randomId = "RET-" + (int)(Math.random() * 90000 + 10000);
        request.setReturnId(randomId);
        request.setStatus("APPROVED");
        request.setCreatedAt(LocalDateTime.now());

        ReturnRequest saved = returnRequestRepository.save(request);

        return ResponseEntity.ok(ApiResponse.<ReturnRequest>builder()
                .success(true)
                .message("Return/Exchange request submitted successfully! Return Reference ID: " + randomId)
                .data(saved)
                .build());
    }

    @GetMapping("/track/{returnId}")
    public ResponseEntity<ApiResponse<ReturnRequest>> trackReturn(@PathVariable String returnId) {
        return returnRequestRepository.findByReturnIdIgnoreCase(returnId)
                .map(ret -> ResponseEntity.ok(ApiResponse.<ReturnRequest>builder()
                        .success(true)
                        .message("Return request status found")
                        .data(ret)
                        .build()))
                .orElse(ResponseEntity.status(404).body(ApiResponse.<ReturnRequest>builder()
                        .success(false)
                        .message("Return ID '" + returnId + "' not found.")
                        .build()));
    }
}

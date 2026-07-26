package com.ekart.repository;

import com.ekart.model.ReturnRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;

@Repository
public interface ReturnRequestRepository extends JpaRepository<ReturnRequest, Long> {
    Optional<ReturnRequest> findByReturnIdIgnoreCase(String returnId);
    List<ReturnRequest> findByOrderIdIgnoreCase(String orderId);
    List<ReturnRequest> findByUserEmailIgnoreCase(String userEmail);
}

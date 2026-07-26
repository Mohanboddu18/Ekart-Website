package com.ekart.repository;

import com.ekart.model.OrderTrack;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;

@Repository
public interface OrderTrackRepository extends JpaRepository<OrderTrack, Long> {
    Optional<OrderTrack> findByOrderIdIgnoreCase(String orderId);
    List<OrderTrack> findByCustomerEmailIgnoreCase(String customerEmail);
}

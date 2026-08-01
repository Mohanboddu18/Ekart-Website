package com.ekart.repository;

import com.ekart.model.OrderNotification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderNotificationRepository extends JpaRepository<OrderNotification, Long> {
    List<OrderNotification> findByOrderIdIgnoreCaseOrderByTimestampAsc(String orderId);
    List<OrderNotification> findByRecipientRoleIgnoreCaseOrRecipientEmailIgnoreCaseOrderByTimestampDesc(String recipientRole, String recipientEmail);
    List<OrderNotification> findByRecipientRoleIgnoreCaseOrderByTimestampDesc(String recipientRole);
}

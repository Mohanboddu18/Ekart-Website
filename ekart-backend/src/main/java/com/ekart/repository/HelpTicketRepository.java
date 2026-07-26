package com.ekart.repository;

import com.ekart.model.HelpTicket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HelpTicketRepository extends JpaRepository<HelpTicket, Long> {
    List<HelpTicket> findByEmailIgnoreCase(String email);
}

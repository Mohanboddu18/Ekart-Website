package com.ekart.config;

import com.ekart.model.User;
import com.ekart.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

/**
 * DataInitializer ensures only default Admin user credentials exist in MySQL
 * while all other data (products, orders, notifications) is read purely from MySQL.
 */
@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Initialize default admin user if not present in MySQL
        if (!userRepository.existsByEmail("admin@ekart.com")) {
            User admin = User.builder()
                    .name("Ekart Admin")
                    .email("admin@ekart.com")
                    .password(passwordEncoder.encode("admin123"))
                    .phone("1234567890")
                    .role("ROLE_ADMIN")
                    .build();
            userRepository.save(admin);
            System.out.println(">>> Default Admin account initialized: admin@ekart.com / admin123");
        }
    }
}

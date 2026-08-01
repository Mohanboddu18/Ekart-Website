package com.ekart.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

/**
 * DataInitializer disabled per user preference.
 * Auto-seeding and table resetting logic has been disabled so database records
 * persist across application restarts in IntelliJ IDEA.
 */
//@Component
public class DataInitializer implements CommandLineRunner {

    @Override
    public void run(String... args) throws Exception {
        // Disabled: Default data initialization disabled.
        // Data can be managed manually by the user directly in MySQL or via API endpoints.
    }
}

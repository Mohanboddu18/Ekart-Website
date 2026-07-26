package com.ekart.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RootController {

    @GetMapping("/")
    public ResponseEntity<String> welcome() {
        String html = """
            <!DOCTYPE html>
            <html>
            <head>
                <title>eKart Spring Boot Backend API</title>
                <style>
                    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0F172A; color: #F8FAFC; padding: 3rem; text-align: center; }
                    .card { background-color: #1E293B; border-radius: 16px; padding: 2.5rem; max-width: 650px; margin: 0 auto; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
                    h1 { color: #38BDF8; font-size: 2.2rem; margin-bottom: 0.5rem; }
                    p { color: #94A3B8; font-size: 1.05rem; }
                    .badge { background-color: #22C55E; color: #0F172A; font-weight: bold; padding: 4px 12px; border-radius: 20px; font-size: 0.85rem; }
                    .links { margin-top: 2rem; display: flex; flex-direction: column; gap: 10px; text-align: left; background: #0F172A; padding: 1.5rem; border-radius: 10px; }
                    a { color: #38BDF8; text-decoration: none; font-weight: 600; }
                    a:hover { text-decoration: underline; }
                </style>
            </head>
            <body>
                <div class="card">
                    <span class="badge">● Spring Boot Server Active</span>
                    <h1>eKart Backend Services</h1>
                    <p>Spring Security, JWT Authentication & H2 Data.sql Services are running successfully.</p>
                    
                    <div class="links">
                        <div>🌐 <strong>Frontend App (Angular):</strong> <a href="http://localhost:4200" target="_blank">http://localhost:4200</a></div>
                        <div>🛍️ <strong>Products API:</strong> <a href="/api/products" target="_blank">/api/products</a></div>
                        <div>📦 <strong>Order Tracking API:</strong> <a href="/api/orders/track/EK1001" target="_blank">/api/orders/track/EK1001</a></div>
                        <div>❓ <strong>Help FAQs API:</strong> <a href="/api/help/faqs" target="_blank">/api/help/faqs</a></div>
                        <div>🗄️ <strong>H2 Web Database Console:</strong> <a href="/h2-console" target="_blank">/h2-console</a></div>
                    </div>
                </div>
            </body>
            </html>
            """;
        return ResponseEntity.ok().header("Content-Type", "text/html").body(html);
    }
}

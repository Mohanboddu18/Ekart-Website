package com.ekart.config;

import com.ekart.model.OrderTrack;
import com.ekart.model.Product;
import com.ekart.model.User;
import com.ekart.repository.OrderTrackRepository;
import com.ekart.repository.ProductRepository;
import com.ekart.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrderTrackRepository orderTrackRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        seedUsers();
        seedProducts();
        seedOrders();
    }

    private void seedUsers() {
        if (userRepository.count() == 0) {
            User user = User.builder()
                    .email("user@ekart.com")
                    .password(passwordEncoder.encode("password123"))
                    .name("John Doe")
                    .phone("+1-555-0192")
                    .role("ROLE_USER")
                    .build();

            User admin = User.builder()
                    .email("admin@ekart.com")
                    .password(passwordEncoder.encode("password123"))
                    .name("Admin Ekart")
                    .phone("+1-555-0199")
                    .role("ROLE_ADMIN")
                    .build();

            userRepository.saveAll(Arrays.asList(user, admin));
        }
    }

    private void seedProducts() {
        // Clear old database table and seed user's exact custom image URLs
        productRepository.deleteAll();

        List<Product> products = Arrays.asList(
            Product.builder().name("Nike React Infinity Run Flyknit")
                .description("High-performance cushioned running shoes designed for ultimate comfort and durability.")
                .brand("NIKE").gender("MEN").category("RUNNING").sizes("6,7,8,9,10").colors("white,Blue,Black")
                .price(1299.0).discountPrice(899.0).isInInventory(true).itemsLeft(6)
                .imageURL("https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80")
                .slug("nike-react-infinity-run-flyknit").build(),

            Product.builder().name("Adidas Stylish Shoes")
                .description("Sleek and versatile casual sneakers for everyday comfort and urban lifestyle.")
                .brand("ADIDAS").gender("MEN").category("CASUAL").sizes("7,8,9,10").colors("Pink,White,Black")
                .price(1499.0).discountPrice(1099.0).isInInventory(false).itemsLeft(0)
                .imageURL("https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=600&auto=format&fit=crop&q=80")
                .slug("adidas-stylish-shoes").build(),

            Product.builder().name("Puma Mens Sneakers")
                .description("Classic streetwear sneakers built with premium materials and comfortable cushioning.")
                .brand("PUMA").gender("MEN").category("CASUAL").sizes("6,7,8,9").colors("Gray,White,Black")
                .price(999.0).discountPrice(769.0).isInInventory(true).itemsLeft(4)
                .imageURL("https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&auto=format&fit=crop&q=80")
                .slug("puma-mens-sneakers").build(),

            Product.builder().name("Puma Stylish Sneaker")
                .description("Trendy running sneakers offering soft comfort and responsive stride.")
                .brand("PUMA").gender("MEN").category("RUNNING").sizes("6,7,8,9,10,11").colors("Yellow,Olive,Black")
                .price(1699.0).discountPrice(1299.0).isInInventory(true).itemsLeft(8)
                .imageURL("https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=600&auto=format&fit=crop&q=80")
                .slug("puma-stylish-sneaker").build(),

            Product.builder().name("Adidas Gym Wear")
                .description("Breathable athletic training apparel engineered for intensive workouts.")
                .brand("ADIDAS").gender("MEN").category("GYM").sizes("40,42,44,46,48").colors("white,Gray,Black")
                .price(1249.0).discountPrice(899.0).isInInventory(true).itemsLeft(6)
                .imageURL("https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80")
                .slug("adidas-gym-wear").build(),

            Product.builder().name("Puma College Bag")
                .description("Durable multi-compartment backpack perfect for school, college, and daily travel.")
                .brand("PUMA").gender("MEN").category("COLLEGE").sizes("20,25,30,40").colors("white,Olive,Black")
                .price(899.0).discountPrice(659.0).isInInventory(false).itemsLeft(0)
                .imageURL("https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80")
                .slug("puma-college-bag").build(),

            Product.builder().name("Adidas Casual Tshirt")
                .description("Premium cotton crewneck t-shirt with classic triple stripe styling.")
                .brand("ADIDAS").gender("MEN").category("CASUAL").sizes("40,42,44,46").colors("white,Red,Black")
                .price(1899.0).discountPrice(1399.0).isInInventory(false).itemsLeft(0)
                .imageURL("https://assets.ajio.com/medias/sys_master/root/20250424/4Lug/6809ebf955340d4b4ff709c5/-473Wx593H-442882577-black-MODEL.jpg")
                .slug("adidas-casual-tshirt").build(),

            Product.builder().name("Puma Sports Wear")
                .description("Indoor sports non-marking grip shoes crafted for court agility and speed.")
                .brand("PUMA").gender("MEN").category("EXERCISES").sizes("6,7,8,9,10").colors("white,Blue,Red")
                .price(1199.0).discountPrice(899.0).isInInventory(true).itemsLeft(8)
                .imageURL("https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=600&auto=format&fit=crop&q=80")
                .slug("puma-sports-wear").build(),

            Product.builder().name("Nike Party Wear")
                .description("Vibrant designer sneakers featuring bold aesthetics and maximum impact protection.")
                .brand("NIKE").gender("MEN").category("PARTY").sizes("6,7,8,9,10,11").colors("Orange,Green,Black")
                .price(1499.0).discountPrice(1259.0).isInInventory(true).itemsLeft(6)
                .imageURL("https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&auto=format&fit=crop&q=80")
                .slug("nike-party-wear").build(),

            Product.builder().name("Puma Girls Stylish Bag")
                .description("Cute compact backpack designed for young women and college essentials.")
                .brand("PUMA").gender("GIRLS").category("COLLEGE").sizes("20,25,30,40").colors("white,Pink,Black")
                .price(859.0).discountPrice(629.0).isInInventory(false).itemsLeft(0)
                .imageURL("https://assets.ajio.com/medias/sys_master/root/20240529/BLrO/6656cd1805ac7d77bb879856/-473Wx593H-469618436-pink-MODEL.jpg")
                .slug("puma-girls-stylish-bag").build(),

            Product.builder().name("Adidas React Party Wear")
                .description("High-top party sneakers with reactive sole cushioning.")
                .brand("ADIDAS").gender("MEN").category("PARTY").sizes("6,7,8,9,10").colors("Red,Olive,Black")
                .price(1029.0).discountPrice(759.0).isInInventory(true).itemsLeft(3)
                .imageURL("https://images.unsplash.com/photo-1512374382149-233c42b6a83b?w=600&auto=format&fit=crop&q=80")
                .slug("adidas-react-party-wear").build(),

            Product.builder().name("Puma Air Max")
                .description("Lightweight cushion sole running shoes engineered for speed.")
                .brand("PUMA").gender("MEN").category("RUNNING").sizes("6,7,8,9,10").colors("Green,Blue,Black")
                .price(1039.0).discountPrice(869.0).isInInventory(false).itemsLeft(3)
                .imageURL("https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&auto=format&fit=crop&q=80")
                .slug("puma-air-max").build(),

            Product.builder().name("Wrogn Girls Slippers")
                .description("Comfortable lightweight slides with ergonomic footbed.")
                .brand("WROGN").gender("WOMEN").category("CASUAL").sizes("40,42,44,46").colors("white,Gray,Random")
                .price(1949.0).discountPrice(1299.0).isInInventory(true).itemsLeft(3)
                .imageURL("https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=600&auto=format&fit=crop&q=80")
                .slug("wrogn-girls-slippers").build(),

            Product.builder().name("Men's Adidas Precision")
                .description("Precision fit performance shoes for active lifestyle.")
                .brand("ADIDAS").gender("MEN").category("CASUAL").sizes("6,7,8,9,10").colors("white,Blue,Black")
                .price(1499.0).discountPrice(959.0).isInInventory(false).itemsLeft(0)
                .imageURL("https://images.unsplash.com/photo-1539185441755-769473a23570?w=600&auto=format&fit=crop&q=80")
                .slug("mens-adidas-precision").build(),

            Product.builder().name("Bata Womens Slides")
                .description("Slip-on comfort slides with non-slip sole for daily wear.")
                .brand("BATA").gender("WOMEN").category("SLIDES").sizes("6,7,8,9,10").colors("Orange,Green,Black")
                .price(769.0).discountPrice(599.0).isInInventory(true).itemsLeft(3)
                .imageURL("https://images.unsplash.com/photo-1562273138-f46be4ebdf33?w=600&auto=format&fit=crop&q=80")
                .slug("bata-womens-slides").build(),

            Product.builder().name("Womens Hand Bag")
                .description("Elegant luxury vegan leather handbag with golden hardware.")
                .brand("FREEPIK").gender("WOMEN").category("CASUAL").sizes("10,15,20").colors("white,Blue,Black")
                .price(1299.0).discountPrice(899.0).isInInventory(true).itemsLeft(6)
                .imageURL("https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&auto=format&fit=crop&q=80")
                .slug("womens-hand-bag").build(),

            Product.builder().name("Wenger Trolly Bag")
                .description("Hard-shell expandable spinner luggage bag for international travel.")
                .brand("WENGER").gender("MEN").category("CASUAL").sizes("40,50,60,70").colors("Pink,White,Black")
                .price(1499.0).discountPrice(1099.0).isInInventory(false).itemsLeft(0)
                .imageURL("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC7KR4OpNkbizJ6XseE0deoflAsbR0i-dUehs6tv5tKA&s")
                .slug("wenger-trolly-bag").build(),

            Product.builder().name("Men's Fastrack Watches")
                .description("Analog sports watch with stainless steel casing and water resistance.")
                .brand("FASTRACK").gender("MEN").category("CASUAL").sizes("6,7,8,9").colors("Gray,White,Black")
                .price(999.0).discountPrice(769.0).isInInventory(true).itemsLeft(4)
                .imageURL("https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600&auto=format&fit=crop&q=80")
                .slug("mens-fastrack-watches").build(),

            Product.builder().name("Puma Outdoor Sneaker")
                .description("Rugged trail sneakers with deep traction rubber outsoles.")
                .brand("PUMA").gender("MEN").category("RUNNING").sizes("6,7,8,9,10,11").colors("Yellow,Olive,Black")
                .price(1699.0).discountPrice(1299.0).isInInventory(true).itemsLeft(8)
                .imageURL("https://images.unsplash.com/photo-1579338559194-a162d19bf842?w=600&auto=format&fit=crop&q=80")
                .slug("puma-outdoor-sneaker").build(),

            Product.builder().name("Amalfi Silver Watch")
                .description("Luxury women's silver dial timepiece with mesh strap.")
                .brand("AMALFI").gender("WOMEN").category("CASUAL").sizes("40,42,44,46,48").colors("white,Gray,Black")
                .price(1249.0).discountPrice(899.0).isInInventory(true).itemsLeft(6)
                .imageURL("https://www.furorewatches.com/cdn/shop/products/FU1403_diagonal.jpg?v=1678971850")
                .slug("amalfi-silver-watch").build(),

            Product.builder().name("Puma Travel Bag")
                .description("Duffle bag with dedicated shoe compartment.")
                .brand("PUMA").gender("MEN").category("TRAVEL").sizes("20,25,30,40").colors("white,Olive,Black")
                .price(899.0).discountPrice(659.0).isInInventory(false).itemsLeft(0)
                .imageURL("https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80")
                .slug("puma-travel-bag").build(),

            Product.builder().name("Mens Fashion Jeans")
                .description("Slim fit stretch denim jeans with classic 5-pocket styling.")
                .brand("LEVIS").gender("MEN").category("CASUAL").sizes("30,32,34,36").colors("white,Red,Black")
                .price(899.0).discountPrice(1099.0).isInInventory(false).itemsLeft(0)
                .imageURL("https://images.jdmagicbox.com/quickquotes/images_main/men-denim-baggy-jeans-grey-28-36-2227181052-r8o8rq0a.jpg")
                .slug("mens-fashion-jeans").build(),

            Product.builder().name("Puma Womens Tshirt")
                .description("Soft organic cotton relaxed fit graphic top.")
                .brand("PUMA").gender("WOMEN").category("CASUAL").sizes("38,40,42,44").colors("white,Blue,Red")
                .price(1199.0).discountPrice(899.0).isInInventory(true).itemsLeft(8)
                .imageURL("https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&auto=format&fit=crop&q=80")
                .slug("puma-womens-tshirt").build(),

            Product.builder().name("Park Avenue Signature Collection")
                .description("Premium long-lasting body spray perfume for men.")
                .brand("PARK AVENUE").gender("MEN").category("PARTY").sizes("100,150,200").colors("Discover,Voyage,Neo")
                .price(499.0).discountPrice(359.0).isInInventory(true).itemsLeft(6)
                .imageURL("https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=600&auto=format&fit=crop&q=80")
                .slug("park-avenue-signature").build(),

            Product.builder().name("Santoor Soap")
                .description("Sandalwood and turmeric skin care bath soap pack.")
                .brand("SANTOOR").gender("MEN").category("SOAP").sizes("30,50,100,125").colors("white,Pink,Orange")
                .price(159.0).discountPrice(129.0).isInInventory(false).itemsLeft(0)
                .imageURL("https://cdn.ewshopping.com/uploads/product/36e1905f-8586-4575-9508-b439610e48a4.webp")
                .slug("santoor-soap").build(),

            Product.builder().name("Water Bottle Milton")
                .description("Insulated stainless steel thermal flask keeps drinks hot/cold 24 hours.")
                .brand("MILTON").gender("MEN").category("CASUAL").sizes("500,600,750,1000").colors("Red,Olive,Black")
                .price(1029.0).discountPrice(759.0).isInInventory(true).itemsLeft(3)
                .imageURL("https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&auto=format&fit=crop&q=80")
                .slug("water-bottle-milton").build(),

            Product.builder().name("Lunch Box On White")
                .description("BPA-free leakproof insulated lunch box container with cutlery.")
                .brand("ISTOCK").gender("MEN").category("CASUAL").sizes("500,750").colors("Green,Blue,Black")
                .price(1039.0).discountPrice(869.0).isInInventory(false).itemsLeft(3)
                .imageURL("https://m.media-amazon.com/images/I/714+n-gCAWL.jpg")
                .slug("lunch-box-on-white").build(),

            Product.builder().name("Girls Dress Kids")
                .description("Festive floral embroidered cotton dress for young girls.")
                .brand("ITAMY").gender("KIDS").category("CASUAL").sizes("40,42,44,46").colors("white,Gray,Pink")
                .price(1949.0).discountPrice(1299.0).isInInventory(true).itemsLeft(3)
                .imageURL("https://5.imimg.com/data5/ANDROID/Default/2025/12/569893134/PU/GX/CO/36939600/product-jpeg-500x500.jpg")
                .slug("girls-dress-kids").build(),

            Product.builder().name("Men's Adidas Precision Pro")
                .description("Lightweight cushion sole running shoes engineered for speed.")
                .brand("ADIDAS").gender("MEN").category("CASUAL").sizes("6,7,8,9,10").colors("white,Blue,Black")
                .price(1499.0).discountPrice(959.0).isInInventory(false).itemsLeft(0)
                .imageURL("https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?w=600&auto=format&fit=crop&q=80")
                .slug("mens-adidas-precision-pro").build(),

            Product.builder().name("Puma Vapor Pro 3")
                .description("Professional court tennis shoes with reinforced toe cap and lateral stability.")
                .brand("PUMA").gender("MEN").category("SNEAKER").sizes("6,7,8,9,10").colors("Orange,Green,Black")
                .price(1699.0).discountPrice(1239.0).isInInventory(true).itemsLeft(3)
                .imageURL("https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&auto=format&fit=crop&q=80")
                .slug("puma-vapor-pro-3").build()
        );

        productRepository.saveAll(products);
    }

    private void seedOrders() {
        if (orderTrackRepository.count() == 0) {
            List<OrderTrack> orders = Arrays.asList(
                OrderTrack.builder().orderId("EK1001").trackingNumber("TRK-9837412")
                    .customerEmail("user@ekart.com").customerName("John Doe")
                    .status("IN_TRANSIT").carrier("BlueDart Express").estimatedDelivery("2026-07-28")
                    .shippingAddress("123 Tech Park, MG Road, Bengaluru, 560001")
                    .totalAmount(1798.0).orderDate(LocalDateTime.now()).build(),

                OrderTrack.builder().orderId("EK1002").trackingNumber("TRK-8812490")
                    .customerEmail("user@ekart.com").customerName("John Doe")
                    .status("SHIPPED").carrier("FedEx India").estimatedDelivery("2026-07-29")
                    .shippingAddress("123 Tech Park, MG Road, Bengaluru, 560001")
                    .totalAmount(2598.0).orderDate(LocalDateTime.now()).build(),

                OrderTrack.builder().orderId("EK1003").trackingNumber("TRK-1002341")
                    .customerEmail("admin@ekart.com").customerName("Admin Ekart")
                    .status("DELIVERED").carrier("Delhivery Cargo").estimatedDelivery("2026-07-25")
                    .shippingAddress("45 Admin Towers, Cyber City, Gurugram, 122002")
                    .totalAmount(899.0).orderDate(LocalDateTime.now()).build()
            );

            orderTrackRepository.saveAll(orders);
        }
    }
}

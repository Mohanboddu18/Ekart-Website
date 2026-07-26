package com.ekart.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "products")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(length = 2000)
    private String description;

    private String brand;

    private String gender;

    private String category;

    private String sizes; // Comma-separated sizes e.g. "6,7,8,9,10"

    private String colors; // Comma-separated colors e.g. "White,Blue,Black"

    private Double price;

    private Double discountPrice;

    private Boolean isInInventory;

    private Integer itemsLeft;

    @Column(length = 1000)
    private String imageURL;

    private String slug;

    // Transient helper methods for JSON response matching Angular Product interface
    public Integer[] getSizeArray() {
        if (sizes == null || sizes.trim().isEmpty()) return new Integer[0];
        String[] parts = sizes.split(",");
        Integer[] result = new Integer[parts.length];
        for (int i = 0; i < parts.length; i++) {
            try {
                result[i] = Integer.parseInt(parts[i].trim());
            } catch (Exception e) {
                result[i] = 0;
            }
        }
        return result;
    }

    public String[] getColorArray() {
        if (colors == null || colors.trim().isEmpty()) return new String[0];
        return colors.split(",");
    }
}

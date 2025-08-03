package com.example.demo.card;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity(name = "Cards")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Card {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private int attack;

    @Column(nullable = false)
    private int defence;

    @Column(nullable = false)
    private int speed;

    @Column(nullable = false)
    private int ki;

    @Column(nullable = false)
    private int resistance;

    @Column(nullable = false)
    private int especial;

    @Column(name = "image_url", nullable = false, length = 100)
    private String imageUrl;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(length = 100)
    private String description;

    @Column(length = 2)
    private String code;
}

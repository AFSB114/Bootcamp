package com.example.demo.card;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity(name = "Cards")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
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
    private int stamina;

    @Column(nullable = false)
    private int especial;

    @Column(name = "image_url", nullable = false)
    private String imageUrl;

    @Column(nullable = false, length = 100)
    private String name;

    private String description;
}

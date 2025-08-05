package com.example.demo.card;

public record CardDTO(
        String name,
        String image,
        AttributesDTO attributes,
        String description) {
}

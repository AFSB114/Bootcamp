package com.example.demo.card;

import lombok.Builder;

@Builder
public record CardIdDTO (
        int id,
        String name,
        String image,
        AttributesDTO attributes,
        String description
){
}

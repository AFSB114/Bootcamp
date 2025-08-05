package com.example.demo.card;

import lombok.Builder;

@Builder
public record AttributesDTO (
        int attack,
        int defense,
        int speed,
        int ki,
        int stamina,
        int special){
}

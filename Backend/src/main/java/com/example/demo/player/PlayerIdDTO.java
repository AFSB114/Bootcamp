package com.example.demo.player;

import lombok.Builder;

@Builder
public record PlayerIdDTO(
        String id,
        String username
) {
}

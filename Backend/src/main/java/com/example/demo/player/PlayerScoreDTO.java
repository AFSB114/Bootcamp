package com.example.demo.player;

import lombok.Builder;

@Builder
public record PlayerScoreDTO(
        PlayerIdDTO playerId,
        int score
) {
}

package com.example.demo.game_session;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Time;
import java.time.LocalDateTime;

@Entity(name = "game_sessions")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GameSession {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "created_at",nullable = false)
    private LocalDateTime createdAt;
}

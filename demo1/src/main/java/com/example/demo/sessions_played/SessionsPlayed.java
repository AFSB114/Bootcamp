package com.example.demo.sessions_played;

import com.example.demo.game_session.GameSession;
import com.example.demo.player.Player;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity(name = "History")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SessionsPlayed {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Player player;

    @ManyToOne
    @JoinColumn(name = "session_id", nullable = false)
    private GameSession session;

    private int score;

    @Enumerated(EnumType.STRING)
    private StatusSessionsPlayedType status;
}

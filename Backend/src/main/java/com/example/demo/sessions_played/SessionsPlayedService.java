package com.example.demo.sessions_played;

import com.example.demo.game_session.GameSession;
import com.example.demo.game_session.GameSessionService;
import com.example.demo.player.Player;
import com.example.demo.player.PlayerScoreDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SessionsPlayedService {

    private final SessionsPlayedRepository sessionsPlayedRepository;
    private final GameSessionService gameSessionService;

    public List<SessionsPlayed> findAll() {
        return sessionsPlayedRepository.findAll();
    }

    public void newSession(List<PlayerScoreDTO> playerScores) {
        GameSession gameSession = gameSessionService.newGameSession();

        boolean firstAlreadyPass = false;
        for (PlayerScoreDTO playerScore : playerScores) {
            SessionsPlayed sessionsPlayed;
            if (!firstAlreadyPass) {
                sessionsPlayed = dtoToModel(playerScore, gameSession, StatusSessionsPlayedType.WIN);
                firstAlreadyPass = true;
            } else {
                sessionsPlayed = dtoToModel(playerScore, gameSession, StatusSessionsPlayedType.LOSE);
            }
            sessionsPlayedRepository.save(sessionsPlayed);
        }
    }

    private SessionsPlayed dtoToModel(PlayerScoreDTO playerScoreDTO, GameSession gameSession, StatusSessionsPlayedType statusSessionsPlayedType) {
        return SessionsPlayed.builder()
                .session(gameSession)
                .player(Player.builder()
                        .id(playerScoreDTO.playerId().id())
                        .build())
                .score(playerScoreDTO.score())
                .status(statusSessionsPlayedType)
                .build();
    }
}

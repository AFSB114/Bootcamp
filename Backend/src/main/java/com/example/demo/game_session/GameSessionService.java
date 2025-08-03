package com.example.demo.game_session;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GameSessionService {

    private final GameSessionRepository gameSessionRepository;

    public List<GameSession> findAll(){
        return gameSessionRepository.findAll();
    }
}

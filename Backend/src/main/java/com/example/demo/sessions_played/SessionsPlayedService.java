package com.example.demo.sessions_played;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SessionsPlayedService {

    private final SessionsPlayedRepository sessionsPlayedRepository;

    public List<SessionsPlayed> findAll() {
        return sessionsPlayedRepository.findAll();
    }
}

package com.example.demo.sessions_played;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/sessions-played")
@RequiredArgsConstructor
public class SessionsPlayedController {

    private final SessionsPlayedService sessionsPlayedService;

    @GetMapping("/")
    public ResponseEntity<?> getAllSessionsPlayed() {
        return ResponseEntity.ok(sessionsPlayedService.findAll());
    }
}

package com.example.demo.sessions_played;

import com.example.demo.player.PlayerScoreDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/sessions-played")
@RequiredArgsConstructor
public class SessionsPlayedController {

    private final SessionsPlayedService sessionsPlayedService;

    @GetMapping("/")
    public ResponseEntity<?> getAllSessionsPlayed() {
        return ResponseEntity.ok(sessionsPlayedService.findAll());
    }

    @PostMapping("/")
    public ResponseEntity<?> newSessionPlayed(@RequestBody List<?> value) {
        System.out.println(value);
//        sessionsPlayedService.newSession(value);
        return ResponseEntity.ok("All work");
    }
}

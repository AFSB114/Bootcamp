package com.example.demo.player;

import com.example.demo.DTO.ResponseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/player")
@RequiredArgsConstructor
public class PlayerController {

    private final PlayerService playerService;

    @GetMapping("/")
    public ResponseEntity<?> getPlayerByUsername() {
        return ResponseEntity.ok(playerService.findAll());
    }

    @PostMapping("/")
    public ResponseEntity<?> addNewPlayer(@RequestBody NewPlayer newPlayer) {
        ResponseDTO res = playerService.addNewPlayer(newPlayer);
        if (res.ok()){
            return ResponseEntity.ok(res);
        } else  {
            return ResponseEntity.badRequest().body(res);
        }
    }
}

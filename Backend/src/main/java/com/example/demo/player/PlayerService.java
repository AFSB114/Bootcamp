package com.example.demo.player;

import com.example.demo.DTO.ResponseDTO;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PlayerService {

    private final PlayerRepository playerRepository;

    public List<Player> findAll() {
        return playerRepository.findAll();
    }

    public ResponseDTO addNewPlayer(NewPlayer player) {
        try {
            Player newPlayer = Player
                    .builder()
                    .username(player.username())
                    .created_at(LocalDateTime.now())
                    .build();
            playerRepository.save(newPlayer);
            return new ResponseDTO("Player added successfully", 200, true);
        } catch (Exception ex) {
            return new ResponseDTO("Player added failure", ex.hashCode(), false);
//            ex.printStackTrace();
        }

    }
}

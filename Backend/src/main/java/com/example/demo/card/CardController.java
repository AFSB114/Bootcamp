package com.example.demo.card;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/card")
@RequiredArgsConstructor
public class CardController {

    private final CardService cardService;

    @GetMapping("/")
    public ResponseEntity<?> getAllCards() {
        return ResponseEntity.ok(cardService.findAll());
    }

    @PostMapping("/")
    public ResponseEntity<?> addNewCard(@RequestBody CardDTO cardDTO) {
        cardService.save(cardDTO);
        return ResponseEntity.ok("All work");
    }

    @PostMapping("/all")
    public ResponseEntity<?> addNewCardsAll(@RequestBody List<CardDTO> value) {
        cardService.saveAll(value);
        return ResponseEntity.ok("All work");
    }
}

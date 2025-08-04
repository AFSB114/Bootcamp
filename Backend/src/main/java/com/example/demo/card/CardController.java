package com.example.demo.card;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/card")
@RequiredArgsConstructor
public class CardController {

    private final CardService cardService;

    @GetMapping("/")
    public ResponseEntity<?> getAllCards() {
        return ResponseEntity.ok(cardService.findAll());
    }

    @GetMapping("/{quantity}")
    public ResponseEntity<?> getCards(@PathVariable int quantity) {
        return ResponseEntity.ok(cardService.findAllByQuatity(quantity));
    }
}

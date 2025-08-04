package com.example.demo.card;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CardService {

    private final CardRepository cardRepository;

    public List<Card> findAll(){
        return cardRepository.findAll();
    }

    public List<List<Card>> findAllByQuatity(int quantity){
        List<Card> cards = cardRepository.findRandomEntities(Pageable.ofSize(quantity * 8));

        List<List<Card>> cardsList = new ArrayList<>();

        for (int i = 0; i < cards.size(); i += 8) {
            int end = i + 8;
            cardsList.add(new ArrayList<>(cards.subList(i, end)));
        }

        return cardsList;
    }
}

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

    public List<CardIdDTO> findAll(){
        List<Card> cards = cardRepository.findAll();
        List<CardIdDTO> cardsDto = new ArrayList<>();
        for (Card card : cards){
            cardsDto.add(modelToDTO(card));
        }
        return cardsDto;
    }

    public void save(CardDTO cardDTO) {
        Card card = dtoToModel(cardDTO);
        cardRepository.save(card);
    }

    public void saveAll(List<CardDTO> cards) {
        for (CardDTO cardDTO : cards) {
            Card card = dtoToModel(cardDTO);
            cardRepository.save(card);
        }
    }

    private Card dtoToModel(CardDTO cardDTO) {
        return Card.builder()
                .name(cardDTO.name())
                .ki(cardDTO.attributes().ki())
                .attack(cardDTO.attributes().attack())
                .speed(cardDTO.attributes().speed())
                .defence(cardDTO.attributes().defense())
                .description(cardDTO.description())
                .especial(cardDTO.attributes().special())
                .stamina(cardDTO.attributes().stamina())
                .imageUrl(cardDTO.image())
                .build();
    }

    private CardIdDTO modelToDTO(Card card) {
        return CardIdDTO.builder()
                .id(card.getId())
                .name(card.getName())
                .image(card.getImageUrl())
                .attributes(AttributesDTO.builder()
                        .ki(card.getKi())
                        .attack(card.getAttack())
                        .speed(card.getSpeed())
                        .defense(card.getDefence())
                        .special(card.getEspecial())
                        .stamina(card.getStamina())
                        .build())
                .description(card.getDescription())
                .build();
    }
}

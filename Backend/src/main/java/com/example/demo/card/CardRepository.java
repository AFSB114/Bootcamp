package com.example.demo.card;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface CardRepository extends JpaRepository<Card, Integer> {

    @Query("SELECT e FROM Cards e ORDER BY RANDOM()")
    List<Card> findRandomEntities(Pageable pageable);

    default Optional<Card> findRandomEntity() {
        List<Card> randomEntities = findRandomEntities(Pageable.ofSize(1));
        return randomEntities.isEmpty() ? Optional.empty() : Optional.of(randomEntities.get(0));
    }
}

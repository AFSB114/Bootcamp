package com.example.demo.player;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PlayerRepository extends JpaRepository<Player, String> {
//    Player getPlayerByUsername(String username);
}

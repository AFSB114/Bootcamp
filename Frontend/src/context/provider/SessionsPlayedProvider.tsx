"use client"

import type { PlayerScoreType, PlayerType } from "@/types/players.type";
import SessionsPlayedContext from "@/context/SessionsPlayedContext";
import { useState } from "react";
import type { CardType } from "@/types/card.type";

export default function SessionsPlayedProvider({ children }: { children: React.ReactNode }) {
  const [playerScores, setPlayerScores] = useState<PlayerScoreType[]>([{ playerId: { id: "", username: "" }, score: 0, cards: [] }, { playerId: { id: "", username: "" }, score: 0, cards: [] }]);
  
  const addPlayerScore = (player: PlayerType) => {
    setPlayerScores((currentPlayerScores) => [...currentPlayerScores, { playerId: player, score: 0, cards: [] }]);
  };

  const assignPlayerScore = (player: PlayerType, index: number) => {
    setPlayerScores((currentPlayers) =>
      currentPlayers.map((currentPlayer, i) =>
        i === index
          ?
            { playerId: player, score: 0 , cards: []}
          :
            currentPlayer
      )
    );
  };

  const assigCardsToEachPlayer = (cards: CardType[]) => {
    cards.map((card, index) => {
      setPlayerScores((currentPlayers) => {
        currentPlayers[index].cards.push(card);
        return currentPlayers;
      });
    });
  };
  
    return (
      <SessionsPlayedContext.Provider
        value={{
          playerScores,
          addPlayerScore,
          assignPlayerScore,
          assigCardsToEachPlayer,
        }}
      >
        {children}
      </SessionsPlayedContext.Provider>
    );
}
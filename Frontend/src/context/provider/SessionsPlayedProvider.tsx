"use client";

import type { PlayerScoreType, PlayerType } from "@/types/players.type";
import SessionsPlayedContext from "@/context/SessionsPlayedContext";
import { useEffect, useState } from "react";
import type { CardType } from "@/types/card.type";

export default function SessionsPlayedProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [playerScores, setPlayerScores] = useState<PlayerScoreType[]>([
    { playerId: { id: "", username: "" }, score: 0, cards: [] },
    { playerId: { id: "", username: "" }, score: 0, cards: [] },
  ]);

  const addPlayerScore = (player: PlayerType) => {
    setPlayerScores((currentPlayerScores) => [
      ...currentPlayerScores,
      { playerId: player, score: 0, cards: [] },
    ]);
  };

  const assignPlayerScore = (player: PlayerType, index: number) => {
    setPlayerScores((currentPlayers) =>
      currentPlayers.map((currentPlayer, i) =>
        i === index ? { playerId: player, score: 0, cards: [] } : currentPlayer
      )
    );
  };

  const assigCardsToEachPlayer = () => {};

  const sumPointToScore = (indexPlayer: number) => {
    setPlayerScores((currentPlayers) =>
      currentPlayers.map((player, index) =>
        index === indexPlayer ? { ...player, score: player.score + 1 } : player
      )
    );
  };

  useEffect(() => {
    console.log("Player scores updated:", playerScores);
  }, [playerScores]);

  return (
    <SessionsPlayedContext.Provider
      value={{
        playerScores,
        addPlayerScore,
        assignPlayerScore,
        assigCardsToEachPlayer,
        sumPointToScore,
      }}
    >
      {children}
    </SessionsPlayedContext.Provider>
  );
}

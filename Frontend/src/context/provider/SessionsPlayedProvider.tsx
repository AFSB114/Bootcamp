"use client";

import type { PlayerScoreType, PlayerType } from "@/types/players.type";
import SessionsPlayedContext from "@/context/SessionsPlayedContext";
import { useCallback, useState } from "react";

export default function SessionsPlayedProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [playerScores, setPlayerScores] = useState<PlayerScoreType[]>([
    { playerId: { id: "", username: "" }, score: 0},
    { playerId: { id: "", username: "" }, score: 0},
  ]);
  const apiUrl = "http://localhost:8085/api/v1";

  const addPlayerScore = (player: PlayerType) => {
    setPlayerScores((currentPlayerScores) => [
      ...currentPlayerScores,
      { playerId: player, score: 0},
    ]);
  };

  const assignPlayerScore = (player: PlayerType, index: number) => {
    setPlayerScores((currentPlayers) =>
      currentPlayers.map((currentPlayer, i) =>
        i === index ? { playerId: player, score: 0} : currentPlayer
      )
    );
  };

  const sumPointToScore = (indexPlayer: number) => {
    setPlayerScores((currentPlayers) =>
      currentPlayers.map((player, index) =>
        index === indexPlayer ? { ...player, score: player.score + 1 } : player
      )
    );
  };

  const saveOnServer = useCallback(async () => {
    const copyPlayerScores = [...playerScores];
    copyPlayerScores.sort((a, b) => b.score - a.score);

    const res = await fetch(`${apiUrl}/sessions-played/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify( copyPlayerScores ),
    });
    if (!res.ok) throw new Error("Failed to save player scores.");
    console.log("Player scores saved on server.");
  }, [playerScores, apiUrl]);

  return (
    <SessionsPlayedContext.Provider
      value={{
        playerScores,
        addPlayerScore,
        assignPlayerScore,
        sumPointToScore,
        saveOnServer
      }}
    >
      {children}
    </SessionsPlayedContext.Provider>
  );
}

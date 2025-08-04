"use client"

import type { PlayerScoreType, PlayerType } from "@/types/players.type";
import type { RequestSessionsPlayedType } from "@/types/sessionsPlayed.type";
import SessionsPlayedContext from "@/context/SessionsPlayedContext";
import { useState } from "react";

export default function SessionsPlayedProvider({ children }: { children: React.ReactNode }) {
  const [playerScores, setPlayerScores] = useState<PlayerScoreType[]>([{ playerId: { id: "", username: "" }, score: 0 }, { playerId: { id: "", username: "" }, score: 0 }]);
  
  const addPlayerScore = (player: PlayerType) => {
    setPlayerScores((currentPlayerScores) => [...currentPlayerScores, { playerId: player, score: 0 }]);
  };
  
  const addSessionsPlayed = (sessionsPlayed: RequestSessionsPlayedType) => {
    return
  };
  
    return (
        <SessionsPlayedContext.Provider value={{playerScores, addPlayerScore, addSessionsPlayed}}>
            {children}
        </SessionsPlayedContext.Provider>
    );
}
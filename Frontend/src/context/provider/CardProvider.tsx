"use client"

import { useCallback } from "react";
import CardContext from "../CardContext";
import useSessionsPlayed from "@/hooks/useSessionsPlayed";

export default function CardProvider({ children }: { children: React.ReactNode }) {
  const { playerScores, assigCardsToEachPlayer } = useSessionsPlayed();
  const apiUrl = "http://localhost:8085/api/v1";

  const getCards = useCallback(async () => {
    try {
      const res = await fetch(`${apiUrl}/card/${playerScores.length}`);
      if (!res.ok) throw new Error("Failed to fetch cards.");
      const cards = await res.json();
      assigCardsToEachPlayer(cards);
    } catch (error) {
      console.error(error);
    }
  }, [apiUrl, playerScores, assigCardsToEachPlayer]);

  return (
    <CardContext.Provider value={{getCards}}>
      {children}
    </CardContext.Provider>
  );
}
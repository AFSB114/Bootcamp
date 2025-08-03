"use client"

import {useCallback, useState} from "react";
import GameSessionContex from "@/context/GameSessionContext";
import type { GameSessionType } from "@/types/gameSession.type";

export default function GameSessionProvider({children}: {children: React.ReactNode}) {
  const [gameSession, setGameSession] = useState<GameSessionType>({ id: "", duration: 0, createdAt: new Date() });
  const apiUrl = "http://localhost:8085/api/v1";

    const getGameSession = useCallback(async () => {
        try {
            const res = await fetch(`${apiUrl}/gameSession/new`);
            if (!res.ok) throw new Error("Failed to create game session.");
            const newGameSession: GameSessionType = await res.json();
            setGameSession(newGameSession);
        } catch (error) {
            console.error(error);
        }
    }, [apiUrl]);

    return (
        <GameSessionContex.Provider value={{ gameSession, getGameSession}}>
            {children}
        </GameSessionContex.Provider>
    );
}
"use client"

import PlayerContext from "@/context/PlayerContext";
import {type ReactNode, useCallback, useEffect, useState} from "react";
import {PlayerType} from "@/types/players.type";

export default function PlayerProvider({children}:{children: ReactNode}) {
    const [playerList, setPlayerList] = useState<PlayerType[] | null>(null);
    const apiUrl = "http://localhost:8085/api/v1";

    const getPlayers = useCallback(async ()=>{
        try {
            const res = await fetch(`${apiUrl}/player/`);
            if (!res.ok) throw new Error("Failed to fetch players.");
            const players: PlayerType[] = await res.json();
            setPlayerList(players);
        } catch (error) {
            console.error(error);
        }
    },[apiUrl]);
    
    useEffect(() => {
        getPlayers();
    },[getPlayers])
    
    const addPlayer = useCallback(async (newPlayer: Omit<PlayerType, "id">)=> {
        try {
            const res = await fetch(`${apiUrl}/player/`,{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(newPlayer),
            })
            if (!res.ok) throw new Error("Failed to create player");
        } catch (error){
            console.error(error);
        }
        getPlayers()
    },[apiUrl, getPlayers]);

    return (
        <PlayerContext.Provider
            value={{
                playerList,
                addPlayer,
        }}>
            {children}
        </PlayerContext.Provider>
    )
}
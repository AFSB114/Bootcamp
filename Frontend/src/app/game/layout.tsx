import {ReactNode} from "react";
import PlayerProvider from "@/context/provider/PlayerProvider";
import GameSessionProvider from "@/context/provider/GameSessionProvider";
import SessionsPlayedProvider from "@/context/provider/SessionsPlayedProvider";
import CardProvider from "@/context/provider/CardProvider";

export default function Layout({children}: {children: ReactNode}) {
    return (
        <PlayerProvider>
            <GameSessionProvider>
                <SessionsPlayedProvider>
                    <CardProvider>
                        {children}
                    </CardProvider>
                </SessionsPlayedProvider>
            </GameSessionProvider>
        </PlayerProvider>
    );
}
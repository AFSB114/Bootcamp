import {useContext} from "react";
import PlayerContext from "@/context/PlayerContext";

export default function usePlayer() {
    const context = useContext(PlayerContext);
    if (!context) throw new Error("You must use a player provider");
    return context;
}
"use client"

import {createContext} from "react";
import {PlayerContextType} from "@/types/players.type";

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);
export default PlayerContext;
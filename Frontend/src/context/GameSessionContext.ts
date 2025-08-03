"use client"

import {createContext} from "react";
import type { GameSessionContextType } from "@/types/gameSession.type";

const GameSessionContex = createContext<GameSessionContextType | undefined>(undefined);
export default GameSessionContex;
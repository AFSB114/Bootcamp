"use client"

import {createContext} from "react";
import type { SessionsPlayedContextType } from "@/types/sessionsPlayed.type";

const SessionsPlayedContext = createContext<
  SessionsPlayedContextType | undefined
>(undefined);
export default SessionsPlayedContext;
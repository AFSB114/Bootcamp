"use client"

import {createContext} from "react";
import type { CardContextType } from "@/types/card.type";

const CardContext = createContext<CardContextType | undefined>(undefined);
export default CardContext;
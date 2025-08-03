import { useContext } from "react";
import GameSessionContex from "@/context/GameSessionContext";

export default function useGameSession() {
  const context = useContext(GameSessionContex);
  if (!context) throw new Error("You must use a game session provider");
  return context;
}

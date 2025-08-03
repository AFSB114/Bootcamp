import { useContext } from "react";
import SessionsPlayedContext from "@/context/SessionsPlayedContext";

export default function useSessionsPlayed() {
  const context = useContext(SessionsPlayedContext);
  if (!context) throw new Error("You must use a sessions played provider");
  return context;
}

import type { CardType } from "./card.type";
import type { GameSessionType } from "./gameSession.type";
import type { PlayerScoreType, PlayerType } from "./players.type";

export interface SessionsPlayedType {
    id: string;
    sessionId: GameSessionType;
    playerId: PlayerType;
    createdAt: Date;
}

export interface RequestSessionsPlayedType {
    sessionId: GameSessionType;
    players: PlayerScoreType[];
}

export interface SessionsPlayedContextType {
  playerScores: PlayerScoreType[];
  addPlayerScore: (player: PlayerType) => void;
  assignPlayerScore: (player: PlayerType, index: number) => void;
  sumPointToScore: (indexPlayer: number) => void;
  saveOnServer: () => void;
}
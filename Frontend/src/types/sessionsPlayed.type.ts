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
    addSessionsPlayed: (sessionsPlayed: RequestSessionsPlayedType) => void;
}
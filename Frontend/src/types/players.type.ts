
export interface PlayerType {
    id: string;
    username: string;
}

export interface PlayerContextType {
    playerList: PlayerType[] | null;
    addPlayer: (player: Omit<PlayerType, "id">) => void;
}

export interface PlayerScoreType {
    playerId: PlayerType;
    score: number;
}
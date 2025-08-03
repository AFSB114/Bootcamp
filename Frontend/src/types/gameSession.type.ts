export interface GameSessionType {
  id: string;
  duration: number;
  createdAt: Date;
}

export interface GameSessionContextType {
  gameSession: GameSessionType;
  getGameSession: () => void;
}
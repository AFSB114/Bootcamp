export interface CardType {
  id: number;
  name: string;
  image: string;
  attributes: {
    attack: number;
    defense: number;
    speed: number;
    ki: number;
    stamina: number;
    special: number;
  };
  description: string;
};

export interface CardContextType {
  getCards: () => void;
}

export interface AttributesType {
  attack: number;
  defense: number;
  speed: number;
  ki: number;
  stamina: number;
  special: number;
}

export interface CardType {
  id: number;
  name: string;
  image: string;
  attributes: AttributesType;
  description: string;
}

export interface CardContextType {
  cardList: CardType[][];
  deleteCard: (cardId: number) => void;
  getCards: () => void;
}

export enum Attributes {
  attack = "attack",
  defense = "defense",
  speed = "speed",
  ki = "ki",
  stamina = "stamina",
  special = "special",
}

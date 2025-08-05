"use client";

import { useCallback, useEffect, useState } from "react";
import CardContext from "../CardContext";
import useSessionsPlayed from "@/hooks/useSessionsPlayed";
import { CardType } from "@/types/card.type";
import CardList from "@/mocks/CardList.json";

export default function CardProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { playerScores } = useSessionsPlayed();
  const numPlayers = playerScores.length;
  const apiUrl = "http://localhost:8085/api/v1";
  
  const [cardList, setCardList] = useState<CardType[][]>([]);
  
  const getCards = useCallback(() => {
    const cards = [...CardList];

    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }

    const totalCards = playerScores.length * 8;
    const sliceCards = cards.slice(0, totalCards);

    const packsSlices: CardType[][] = [];
    for (let i = 0; i < sliceCards.length; i += 8) {
      const pack = sliceCards.slice(i, i + 8);
      packsSlices.push(pack);
    }

    setCardList(packsSlices);
  }, [numPlayers]);

  const deleteCard = (cardId: number) => {
    setCardList((currentCardList) =>
      currentCardList.map((cardList) =>
        cardList.filter((card) => card.id !== cardId)
      )
    );
  };

  useEffect(() => {
    if (numPlayers > 0) {
      getCards();
    }
  }, [numPlayers, getCards]);

  return (
    <CardContext.Provider
      value={{ getCards, cardList, deleteCard }}
    >
      {children}
    </CardContext.Provider>
  );
}

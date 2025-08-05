"use client";

import { useCallback, useEffect, useState } from "react";
import CardContext from "../CardContext";
import useSessionsPlayed from "@/hooks/useSessionsPlayed";
import { CardType } from "@/types/card.type";

export default function CardProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { playerScores } = useSessionsPlayed();
  const numPlayers = playerScores.length;
  const apiUrl = "http://localhost:8085/api/v1";
  const [cardList, setCardList] = useState<CardType[][]>([]);
  const [cards, setCards] = useState<CardType[]>([]);

  const getCardsApi = useCallback(async () => {
    const res = await fetch(`${apiUrl}/card/`);
    if (!res.ok) throw new Error("Failed to fetch cards.");
    const cards: CardType[] = await res.json();
    setCards(cards);
  }, [apiUrl])
  
  useEffect(() => {
    getCardsApi();
  }, [getCardsApi]);

  const getCards = useCallback(() => {
    const copyCards = [...cards];

    for (let i = copyCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copyCards[i], copyCards[j]] = [copyCards[j], copyCards[i]];
    }

    const totalCards = playerScores.length * 8;
    const sliceCards = copyCards.slice(0, totalCards);

    const packsSlices: CardType[][] = [];
    for (let i = 0; i < sliceCards.length; i += 8) {
      const pack = sliceCards.slice(i, i + 8);
      packsSlices.push(pack);
    }

    setCardList(packsSlices);
  }, [numPlayers, cards]);

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

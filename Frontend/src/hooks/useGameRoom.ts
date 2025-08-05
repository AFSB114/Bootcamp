import { useCallback, useEffect, useState } from "react";
import useSessionsPlayed from "./useSessionsPlayed";
import { Attributes } from "@/types/card.type";
import type { PlayedCardsType } from "@/types/gameRoom.type";
import useCard from "./useCard";
import CardList from "@/mocks/CardList.json";

export default function useGameRoom() {
  const { playerScores, sumPointToScore } = useSessionsPlayed();
  const [round, setRound] = useState<number>(1);
  const [turn, setTurn] = useState<number>(-1);
  const [attributeActive, setAttributeActive] = useState<Attributes>(
    Attributes.attack
  );
  const [playedCards, setPlayedCards] = useState<PlayedCardsType[]>([]);
  const { deleteCard } = useCard();
  const [showAttributeModal, setShowAttributeModal] = useState(true);
  const [showWinRoundModal, setShowWinRoundModal] = useState(false);
  const [winnerRound, setWinnerRound] = useState<string>("");
  const [showRankingModal, setShowRankingModal] = useState(false);
  const [hiddenCards, setHiddenCards] = useState<boolean>(false);

  const handleSelectCard = (attributeSelectedValue: number, cardId: number) => {
    setPlayedCards((currentPlayedCards) => [
      ...currentPlayedCards,
      { playerIndex: turn, attributeSelectedValue, cardId },
    ]);
    deleteCard(cardId);
    setTurn(turn + 1);
  };

  const compareValuesCards = useCallback(() => {
    const playedCardsCopy = [...playedCards];
    const orderedCard = playedCardsCopy.sort(
      (a, b) => b.attributeSelectedValue - a.attributeSelectedValue
    );

    const winnerRound = orderedCard[0];

    setTimeout(() => {
      sumPointToScore(winnerRound.playerIndex);
      setWinnerRound(playerScores[winnerRound.playerIndex].playerId.username);
      setShowWinRoundModal(true);
    }, 1000);
  }, [playedCards, playerScores, sumPointToScore]);

  useEffect(() => {
    if (playerScores.length > 0 && turn >= playerScores.length) {
      compareValuesCards();

      setHiddenCards(true);
      setTurn(-1);

      if (turn) {
        setTimeout(() => {
          setRound((prevRound) => prevRound + 1);
          setShowAttributeModal(true);
          setPlayedCards([]);
          setHiddenCards(false);
        }, 2000);
      }
    }
  }, [turn, playerScores, compareValuesCards]);

  useEffect(() => {
    if (round > 8) {
      const maxScore = playerScores[0].score;
      const playersScoresCopy = [...playerScores];
      const winners = playersScoresCopy.filter(
        (player) => player.score === maxScore
      );

      if (winners.length > 1) {
        alert(
          `Hay un empate entre ${winners[0].playerId.username} y ${winners[1].playerId.username}`
        );
        return;
      }
      setShowRankingModal(true);
    }
  }, [round, playerScores]);

  const getCard = (cardId: number) => {
    const card = CardList.find((card) => card.id == cardId);
    if (card) return card;
    return CardList[0];
  };

  const handleCloseshowAttributeModal = () => {
    setShowAttributeModal(false);
  };

  const handleChangeAttribute = (attribute: Attributes) => {
    setAttributeActive(attribute);
    setTurn(0);
    handleCloseshowAttributeModal();
  };

  const handleClosesRoundModal = () => {
    setShowWinRoundModal(false);
  };

  useEffect(() => {
    if (showWinRoundModal) {
      setTimeout(() => {
        handleClosesRoundModal();
      }, 1000);
    }
  }, [showWinRoundModal]);

  const handleCloseRankingModal = () => {
    setShowRankingModal(false);
  };

  return {
    round,
    turn,
    attributeActive,
    playedCards,
    showAttributeModal,
    showWinRoundModal,
    winnerRound,
    showRankingModal,
    hiddenCards,
    handleSelectCard,
    handleChangeAttribute,
    handleCloseshowAttributeModal,
    handleClosesRoundModal,
    handleCloseRankingModal,    
    getCard,
  }
}
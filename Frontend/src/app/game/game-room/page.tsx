"use client";

import React, { useCallback, useEffect, useState } from "react";
import Profile from "@/components/Profile";
import Card from "@/components/Card";

import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import useSessionsPlayed from "@/hooks/useSessionsPlayed";
import { PlayedCardsType } from "@/types/gameRoom.type";
import { Attributes, CardType } from "@/types/card.type";
import CardList from "@/mocks/CardList.json";
import useCard from "@/hooks/useCard";
import { useRouter } from "next/navigation";
import { routeModule } from "next/dist/build/templates/app-page";
import Modal from "@/components/Modal";

const UserProfile = ({
  user,
  variant,
  className = "",
}: {
  user: string;
  variant: number;
  className?: string;
}) => {
  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      <Profile
        variant={variant}
        className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28"
      />
      <h1 className="text-white text-sm md:text-base font-semibold">{user}</h1>
    </div>
  );
};

export default function Page() {
  const { playerScores, sumPointToScore } = useSessionsPlayed();
  const [round, setRound] = useState<number>(1);
  const [turn, setTurn] = useState<number>(0);
  const [attributeActive, setAttributeActive] = useState<Attributes>(
    Attributes.attack
  );
  const [playedCards, setPlayedCards] = useState<PlayedCardsType[]>([]);
  const { cardList, deleteCard } = useCard();
  const [showAttributeModal, setShowAttributeModal] = useState(true);

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

    sumPointToScore(orderedCard[0].playerIndex);

    alert(
      "La ronda la ganó " +
        playerScores[orderedCard[0].playerIndex].playerId.username
    );
  }, [playedCards, playerScores, sumPointToScore]);

  useEffect(() => {
    if (playerScores.length > 0 && turn >= playerScores.length) {
      compareValuesCards();

      setRound((prevRound) => prevRound + 1);
      setTurn(0);
      setPlayedCards([]);
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

      alert("El ganador es " + playersScoresCopy[0].playerId.username);
    }
  }, [round, playerScores]);

  const getCard = (cardId: number) => {
    const cart = CardList.find((card) => card.id == cardId);
    if (cart) return cart;
    return CardList[0];
  };

  const handleCloseModal = () => {
    setShowAttributeModal(false);
  };

  // const handleChangeAttribute = (attribute: string, value: string) => {
  //   setPlayerScores((currentPlayerScores) =>
  //     currentPlayerScores.map((playerScore) => {
  //       if (
  //         playerScore.playerId.username === playerScores[turn].playerId.username
  //       ) {
  //         playerScore.attributes[attribute] = parseInt(value);
  //       }
  //       return playerScore;
  //     })
  //   );
  // };

  return (
    <div className=" text-white min-h-screen flex flex-col justify-between items-center relative p-4 overflow-clip">
      <Modal isOpen={showAttributeModal} onClose={handleCloseModal}>
        <div className="relative w-[50%] h-[50%]">
      
        </div>
      </Modal>

      <Link
        href="../.."
        className="absolute left-5 top-5 bg-zinc-800/60 rounded-full p-2 hover:bg-orange-500 transition-colors duration-200"
      >
        <ArrowLeftIcon className="h-10 w-10 text-white" />
      </Link>

      <div className="flex justify-around gap-4 mt-4 w-full">
        {playerScores.map((user, index) => {
          if (index >= 2) {
            return (
              <div key={index} className="flex flex-col items-center">
                <div className="flex flex-col justify-center items-center">
                  <UserProfile
                    user={user.playerId.username}
                    variant={index}
                    className={
                      turn == index ? "border-2 border-e-amber-500" : ""
                    }
                  />
                  <h1>{playerScores[index].score}</h1>
                </div>
                <div className="mt-4 w-36 h-48">
                  <div className="relative h-full w-full">
                    {playedCards[index] && (
                      <Card
                        card={getCard(playedCards[index].cardId)}
                        className="absolute bottom-32 left-1/2 -translate-x-1/2 scale-[50%] z-10 hover:z-20 hover:scale-[80%]"
                      />
                    )}
                  </div>
                </div>
              </div>
            );
          }
        })}
      </div>

      <div className="flex items-center justify-between w-full px-28 ">
        <div className="flex items-center gap-4">
          <div className="flex flex-col justify-center items-center">
            <UserProfile
              user={playerScores[0].playerId.username}
              variant={0}
              className={turn == 0 ? "border-2 border-e-amber-500" : ""}
            />
            <h1>{playerScores[0].score}</h1>
          </div>
          <div className="mt-4  w-36 h-48">
            <div className="relative h-full w-full">
              {playedCards[0] && (
                <Card
                  card={getCard(playedCards[0].cardId)}
                  className="absolute bottom-32 left-1/2 -translate-x-1/2 scale-[50%] z-10 hover:z-20 hover:scale-[80%]"
                />
              )}
            </div>
          </div>
        </div>

        <div className="absolute left-2/5 top-2/5 justify-center items-center">
          <div className="text-gray-600 font-bold text-5xl sm:text-6xl md:text-7xl select-none">
            RONDA {round}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="mt-4  w-36 h-48">
            <div className="relative h-full w-full">
              {playedCards[1] && (
                <Card
                  card={getCard(playedCards[1].cardId)}
                  className="absolute bottom-32 left-1/2 -translate-x-1/2 scale-[50%] z-10 hover:z-20 hover:scale-[80%]"
                />
              )}
            </div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <UserProfile
              user={playerScores[1].playerId.username}
              variant={1}
              className={turn == 1 ? "border-2 border-e-amber-500" : ""}
            />
            <h1>{playerScores[1].score}</h1>
          </div>
        </div>
      </div>

      <div className="relative flex justify-center items-center gap-2 w-6xl top-20">
        {cardList[turn] ? (
          cardList[turn].map((card, index) => (
            <div
              className="group relative w-28 h-64 -rotate-6 hover:-translate-y-70 hover:!rotate-0 hover:z-20 transition-all duration-300"
              key={index}
            >
              <Card
                card={card}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-[60%] hover:scale-[100%]"
                handleSelectCard={handleSelectCard}
                attributeSelected={attributeActive}
              />
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

"use client";

import Card from "@/components/Card";
import Profile from "@/components/Profile";

import ModalAttributes from "@/components/ModalAttributes";
import ModalRanking from "@/components/ModalRanking";
import ModalWinRound from "@/components/ModelWinRound";
import useCard from "@/hooks/useCard";
import useGameRoom from "@/hooks/useGameRoom";
import useSessionsPlayed from "@/hooks/useSessionsPlayed";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

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
  const {
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
  } = useGameRoom();
  const { playerScores } = useSessionsPlayed();
  const { cardList} = useCard();
  return (
    <div className=" text-white min-h-screen flex flex-col justify-between items-center relative p-4 overflow-clip">
      <ModalAttributes
        showAttributeModal={showAttributeModal}
        handleCloseModal={handleCloseshowAttributeModal}
        handleChangeAttribute={handleChangeAttribute}
      />

      <ModalWinRound
        winnerRound={winnerRound}
        showWinRoundModal={showWinRoundModal}
        handleClosesRoundModal={handleClosesRoundModal}
      />

      <ModalRanking
        showRankingModal={showRankingModal}
        handleCloseRankingModal={handleCloseRankingModal}
      />

      <div className="absolute bottom-5 left-5 bg-zinc-800/60 rounded-full p-2 hover:bg-orange-500 transition-colors duration-200"></div>

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
                      turn == index ? "bg-gradient-to-r from-yellow-500 to-orange-500 border-2 border-e-amber-500 border-0" : ""
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
          <div className="text-gray-600 font-bold text-center text-5xl sm:text-6xl md:text-7xl select-none">
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
        {cardList[turn] && !hiddenCards ? (
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

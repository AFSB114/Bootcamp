import Profile from "@/components/Profile";
import useSessionsPlayed from "@/hooks/useSessionsPlayed";
import { useRouter } from "next/navigation";
import Modal from "./Modal";

export default function RankingModal({
  showRankingModal,
  handleCloseRankingModal,
  finishedTie,
}: {
  showRankingModal: boolean;
  handleCloseRankingModal: () => void;
  finishedTie: boolean;
}) {
  const { playerScores, saveOnServer } = useSessionsPlayed();
  const router = useRouter();

  const orderedPlayers = playerScores.sort((a, b) => b.score - a.score);
  const otherPlayers = orderedPlayers.slice(1);

  const medals = ["🥇", "🥈", "🥉"];

  const handleClick = () => {
    saveOnServer();
    router.push("../..");
  };

  return (
    <Modal
      isOpen={showRankingModal}
      onClose={handleCloseRankingModal}
      backdrop={false}
    >
      <div className="bg-zinc-900 text-white rounded-2xl p-6 w-full max-w-sm shadow-lg">
        <h2 className="text-orange-500 text-center font-bold text-2xl mb-6">
          Ranking de la Partida
        </h2>

        {!finishedTie
          ? orderedPlayers[0] && (
              <div className="flex flex-col items-center mb-6 text-center">
                <span className="text-5xl mb-2">{medals[0]}</span>
                <Profile className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28" />
                <p className="font-bold text-xl text-orange-400">
                  {orderedPlayers[0].playerId.username}
                </p>
                <p className="text-sm text-zinc-400">
                  {orderedPlayers[0].score} rondas ganadas
                </p>
              </div>
            )
          : orderedPlayers[0] &&
            orderedPlayers[1] && (
              <div className="flex flex-row items-center mb-6 text-center">
                <div className="flex flex-col items-center mb-6 text-center">
                  <span className="text-5xl mb-2">{medals[0]}</span>
                  <Profile className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28" />
                  <p className="font-bold text-xl text-orange-400">
                    {orderedPlayers[1].playerId.username}
                  </p>
                  <p className="text-sm text-zinc-400">
                    {orderedPlayers[0].score} rondas ganadas
                  </p>
                </div>
                <div className="flex flex-col items-center mb-6 text-center">
                  <span className="text-5xl mb-2">{medals[0]}</span>
                  <Profile className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28" />
                  <p className="font-bold text-xl text-orange-400">
                    {orderedPlayers[1].playerId.username}
                  </p>
                  <p className="text-sm text-zinc-400">
                    {orderedPlayers[0].score} rondas ganadas
                  </p>
                </div>
              </div>
            )}

        <div className="flex flex-col gap-3 divide-y divide-zinc-700">
          {otherPlayers.map((player, index) => {
            if (finishedTie && index <= 1) return <></>;
            return (
              <div key={index} className="flex items-center justify-between pb-2">
                <div className="flex items-center gap-4">
                  <span className="font-bold text-lg w-8 text-center text-zinc-400">
                    {medals[index + 1] || `#${index + 2}`}
                  </span>
                  <Profile className="w-10 h-10" />
                  <p className="font-semibold">{player.playerId.username}</p>
                </div>
                <p className="text-zinc-300 font-mono">{player.score} rondas</p>
              </div>
            );
          })}
        </div>

        <div className="w-full flex flex-col items-center gap-4 mt-8">
          <button
            type="button"
            onClick={handleClick}
            className="w-full text-center px-6 py-3 text-lg font-bold rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg hover:shadow-orange-500/50 hover:scale-105 transition-all duration-300"
          >
            Salir del Juego
          </button>
        </div>
      </div>
    </Modal>
  );
}

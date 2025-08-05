import Modal from "./Modal";

export default function ModalWinRound({
  winnerRound,
  showWinRoundModal,
  handleClosesRoundModal,
}: {
  winnerRound: string;
  showWinRoundModal: boolean;
  handleClosesRoundModal: () => void;
}) {
  return (
    <Modal isOpen={showWinRoundModal} onClose={handleClosesRoundModal}>
      <div className="relative bg-zinc-900 border-2 border-orange-500 rounded-2xl shadow-2xl shadow-orange-500/30 p-8 w-full max-w-md mx-4">
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="text-5xl" role="img" aria-label="trophy">
            🏆
          </span>
          <h2 className="text-3xl font-bold text-white">
            ¡Ha ganado <span className="text-orange-400">{winnerRound}</span> !
          </h2>
        </div>
      </div>
    </Modal>
  );
}

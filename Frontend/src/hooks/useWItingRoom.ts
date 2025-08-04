import type { PlayerType } from "@/types/players.type";
import { useRouter } from "next/router";
import { useState, ChangeEvent } from "react";
import useCard from "./useCard";
import useGameSession from "./useGameSession";
import usePlayer from "./usePlayer";
import useSessionsPlayed from "./useSessionsPlayed";

export default function useWItingRoom() { 
  const [numPlayers, setNumPlayers] = useState(2);
  const [showModal, setShowModal] = useState(false);
  const [formNewPlayer, setFormNewPlayer] = useState<Omit<PlayerType, "id">>({
    username: "",
  });
  const [players, setPlayers] = useState<PlayerType[]>([
    { id: "", username: "" },
    { id: "", username: "" },
  ]);
  const { addPlayerScore, assignPlayerScore } =
    useSessionsPlayed();
  const { playerList, addPlayer } = usePlayer();
  const { getGameSession } = useGameSession();
  const { getCards } = useCard();
  const router = useRouter();

  const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;

    if (selectedValue === "new") {
      setShowModal(true);
      event.target.value = "";
      return;
    }

    const selectedIndex = parseInt(event.target.id);
    if (isNaN(selectedIndex)) return;

    const selectedPlayer = playerList?.find(
      (player) => player.id === selectedValue
    );

    if (selectedPlayer) {
      assignPlayerScore(selectedPlayer, selectedIndex);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const username = e.target.value;
    if (username == " ") return;
    setFormNewPlayer({ username: username });
  };

  const handleAddPlayer = () => {
    setNumPlayers(numPlayers + 1);
    addPlayerScore({ id: "", username: "" });
  };

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formNewPlayer.username != null && formNewPlayer.username != "") {
      let alreadyExists = false;
      playerList?.map((player: PlayerType) => {
        if (player.username == formNewPlayer.username) {
          alert("Este nombre de usuario ya existe");
          alreadyExists = true;
          return;
        }
      });

      if (!alreadyExists) {
        addPlayer(formNewPlayer);
        setShowModal(false);
        setFormNewPlayer({ username: "" });
      }
    } else {
      alert("Debe ingresar su nombre de usuario");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handlePlaySession = () => {
    getGameSession();
    getCards();

    router.push("../game/game-room");
  };

  return {
    numPlayers,
    showModal,
    formNewPlayer,
    players,
    handleSelect,
    handleChange,
    handleAddPlayer,
    handleSubmit,
    handleCloseModal,
    handlePlaySession,
  };
}
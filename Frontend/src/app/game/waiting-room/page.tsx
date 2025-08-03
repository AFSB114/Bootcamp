"use client"

import {ArrowLeftIcon, PlusIcon, XCircleIcon} from "lucide-react";
import Link from "next/link";
import Profile from "@/components/Profile";
import {ChangeEvent, useState} from "react";
import usePlayer from "@/hooks/usePlayer";
import { PlayerType } from "@/types/players.type";
import CustomSelect from "@/components/CustomSelect";
import useSessionsPlayed from "@/hooks/useSessionsPlayed";

export default function Page() {
    const [numPlayers, setNumPlayers] = useState(2);
    const [showModal, setShowModal] = useState(false);
    const [formNewPlayer, setFormNewPlayer] = useState<Omit<PlayerType, "id">>({ username: "" });
    const [players, setPlayers] = useState<PlayerType[]>([{ id: "", username: "" }, { id: "", username: "" }]);
    const { playerScores, addPlayerScore } = useSessionsPlayed();
    const {playerList, addPlayer} = usePlayer();

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

      // ✅ Solo actualiza el estado SI encontraste un jugador
      if (selectedPlayer) {
        setPlayers((currentPlayers) =>
          currentPlayers.map((player, index) =>
            index === selectedIndex ? selectedPlayer : player
          )
        );
      }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const username = e.target.value;
        if (username == " ") return;
        setFormNewPlayer({username: username})
    }

    const handleAddPlayer = () => {
        setNumPlayers(numPlayers + 1);
        addPlayerScore({ id: "", username: "" });
    }

    const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formNewPlayer.username != null && formNewPlayer.username != ""){
            let alreadyExists = false;
            playerList?.map((player: PlayerType) => {
                if (player.username == formNewPlayer.username) {
                    alert("Este nombre de usuario ya existe");
                    alreadyExists = true;
                    return
                }
            })

            if (!alreadyExists) {
                addPlayer(formNewPlayer)
                setShowModal(false);
                setFormNewPlayer({username: ""});
            }
        } else {
            alert("Debe ingresar su nombre de usuario");
        }
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }
    return (
      <div className="relative flex justify-center items-center w-full h-screen bg-[url('./../assets/img/Background-Dragon-Ball.png')] bg-cover bg-no-repeat bg-center p-4">
        <Link
          href="../.."
          className="absolute left-5 top-5 bg-zinc-800/60 rounded-full p-2 hover:bg-orange-500 transition-colors duration-200"
        >
          <ArrowLeftIcon className="h-10 w-10 text-white" />
        </Link>

        <div className="flex flex-col items-center gap-8">
          <div className="flex flex-row flex-wrap items-end justify-center gap-x-6 gap-y-8 max-w-5xl">
            {Array.from({ length: numPlayers }).map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-4 w-52">
                <Profile variant={i} className="w-full h-52" />
                <CustomSelect onChange={handleSelect}  value={players[i].id} id={`${i}`}>
                  <option value="" disabled>
                    Elige tu usuario
                  </option>
                  {playerList?.map((player) => (
                    <option value={player.id} key={player.id} disabled={players.map((player) => player.id).includes(player.id)}>
                      {player.username}
                    </option>
                  ))}
                  <option value="new">Agregar uno nuevo...</option>
                </CustomSelect>
              </div>
            ))}

            {numPlayers < 7 && (
              <div className="w-52 h-[272px] flex items-center justify-center">
                <button
                  onClick={handleAddPlayer}
                  className="w-48 h-48 border-4 border-dashed border-zinc-500 rounded-full flex items-center justify-center text-zinc-500 hover:border-orange-500 hover:text-orange-500 transition-all duration-300"
                >
                  <PlusIcon className="h-24 w-24" />
                </button>
              </div>
            )}
          </div>

          <div className="pt-10">
            <Link
              href="game"
              className="px-20 py-6 text-4xl font-bold rounded-xl text-white bg-gradient-to-br from-orange-500 to-amber-400 border-4 border-blue-900 shadow-lg hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-amber-300 transform transition-all duration-300 ease-in-out animate-pulse-ki"
            >
              EMPEZAR
            </Link>
          </div>
        </div>

        {showModal && (
          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black/60 backdrop-blur-sm">
            <div className="relative bg-zinc-800 border-4 border-orange-500 rounded-2xl shadow-2xl shadow-orange-500/20">
              <form
                className="flex flex-col p-16 gap-6"
                onSubmit={handleSubmit}
              >
                <button
                  type="button"
                  className="absolute top-3 right-3 text-red-500 hover:text-red-700"
                  onClick={handleCloseModal}
                >
                  <XCircleIcon className="h-10 w-10" />
                </button>
                <div className="flex flex-col items-center gap-2">
                  <label
                    htmlFor="username"
                    className="text-3xl font-bold text-orange-400"
                  >
                    Nuevo Guerrero
                  </label>
                  <p className="text-zinc-400">Ingresa tu nombre de usuario</p>
                </div>
                <input
                  type="text"
                  className="bg-zinc-900 border-2 border-zinc-600 text-white p-3 rounded-lg text-2xl focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                  placeholder="Ej: Kakarot"
                  value={formNewPlayer?.username}
                  onChange={handleChange}
                />
                <button
                  type="submit"
                  className="bg-orange-600 mt-4 p-4 text-2xl rounded-lg text-white font-bold hover:bg-orange-500 transition-colors"
                >
                  Guardar
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    );
}
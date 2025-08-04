"use client";

import React from "react";
import Profile from "@/components/Profile";
import Card from "@/components/Card";

import CardList from "@/mocks/CardList.json";
import { ArrowLeftIcon, Key } from "lucide-react";
import Link from "next/link";
import useSessionsPlayed from "@/hooks/useSessionsPlayed";

// Componente para un perfil de usuario (avatar y nombre)
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

// Componente para una carta en el campo de batalla
const UserCard = () => {
  return (
    // Contenedor Padre
    <div className="relative h-full w-full">
      {/* Elemento a centrar */}
      <Card
        card={CardList[0]}
        // 1. Posición absoluta relativa al div de arriba.
        // 2. Lo mueve al centro del contenedor.
        // 3. Lo traslada -50% de su propio tamaño en X e Y para un centrado perfecto.
        // 4. Finalmente, aplica la escala que querías.
        className="absolute bottom-32 left-1/2 -translate-x-1/2 scale-[50%] z-10 hover:z-20 hover:scale-[80%] "
      />
    </div>
  );
};

export default function Page() {
  const { playerScores } = useSessionsPlayed();

  return (
    <div className=" text-white min-h-screen flex flex-col justify-between items-center relative p-4 overflow-clip">
      <Link
        href="../.."
        className="absolute left-5 top-5 bg-zinc-800/60 rounded-full p-2 hover:bg-orange-500 transition-colors duration-200"
      >
        <ArrowLeftIcon className="h-10 w-10 text-white" />
      </Link>

      {/* Sección superior de perfiles */}
      <div className="flex justify-around gap-4 mt-4 w-full">
        {playerScores.map((user, index) => {
          if (index >= 2) {
            return (
              <div key={index} className="flex flex-col items-center">
                <UserProfile user={user.playerId.username} variant={index} />
                <div className="mt-4  w-36 h-48">
                  <UserCard />
                </div>
              </div>
            );
          }
        })}
      </div>

      {/* Sección central con los jugadores principales y la ronda */}
      <div className="flex items-center justify-between w-full px-28 ">
        {/* Jugador Izquierda */}
        <div className="flex items-center gap-4">
          <UserProfile user={playerScores[0].playerId.username} variant={0} />
          <div className="mt-4  w-36 h-48">
            <UserCard />
          </div>
        </div>

        <div className="absolute left-2/5 top-2/5 justify-center items-center">
          <div className="text-gray-600 font-bold text-5xl sm:text-6xl md:text-7xl select-none">
            RONDA 1
          </div>
        </div>

        {/* Jugador Derecha */}
        <div className="flex items-center gap-4">
          <div className="mt-4  w-36 h-48">
            <UserCard />
          </div>
          <UserProfile user={playerScores[1].playerId.username} variant={1} />
        </div>
      </div>

      {/* Sección inferior de cartas */}
      <div className="relative flex justify-center items-center gap-2 w-6xl top-20">
        {Array(8)
          .fill(null)
          .map((_, index) => (
            <div
              className="group relative w-20 h-64 -rotate-6 hover:-translate-y-60 hover:!rotate-0 hover:z-20 transition-all duration-300"
              key={index}
            >
              <Card
                card={CardList[0]}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-[60%] hover:scale-[80%]"
                onClick={() => alert("Hola my id is " + index)/* craer una funcion que reciba los atributos de esta carta y los guarde en un arreglo, comparar, cuando seleccione la carta se guarda en un estado el id de quien tenia el turno y solo los atributos, luego de que todos hayan elegido se hace la comparacion de valores y quien haya ganado, en el estado de jugadores en sesion se aumenta en 1 el score, (las cartas seleccionadas se elmininan de la lista de cartas del usuario que la seleccionó*/}
              />
            </div>
          ))}
      </div>
    </div>
  );
}

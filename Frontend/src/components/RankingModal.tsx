import Link from "next/link";
import Profile from "@/components/Profile";

export default function RankingModal() {
  return (
    <div className="bg-[#1a1a1a] text-white p-6 rounded-xl border-2 border-orange-500 w-[300px]">
      <h2 className="text-orange-500 text-center font-bold text-lg mb-4">
        GANADOR
      </h2>

      {/* Ganador principal */}
      <div className="flex flex-col items-center mb-4">
        <Profile className="w-30" variant={3} />
        <p className="font-semibold">user 1</p>
        <p className="text-sm">9 cartas</p>
      </div>

      {/* Segundo jugador */}
      <div className="flex items-center justify-between mb-2 border-b border-gray-600 py-2">
        <div className="flex items-center gap-2">
          <Profile className="w-6 h-6 rounded-full bg-gray-200" />
          <p>user 2</p>
        </div>
        <p>7 cartas</p>
      </div>

      {/* Botón de salir */}
      <div className="w-full flex justify-center mt-6">
        <Link
          href="/"
          className="px-6 py-2 text-xl font-bold rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg hover:shadow-orange-500/50 hover:scale-105 transition-all duration-300 border-4 border-yellow-600"
        >
          SALIR
        </Link>
      </div>
    </div>
  );
}

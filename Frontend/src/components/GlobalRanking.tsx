import Profile from "@/components/Profile";

export default function GlobalRanking() {
  return (
    <div className="bg-[#1a1a1a] text-white p-6 rounded-xl border-2 border-orange-500 w-[300px]">
      <h2 className="text-orange-500 text-center font-bold text-lg mb-4">
        Ranking Global
      </h2>

      {/* 1° Lugar: Ganador principal */}
      <div className="flex flex-col items-center mb-4">
        <p className="text-yellow-400 font-bold text-2xl">1°</p>
        <Profile className="w-30" variant={3} />
        <p className="font-semibold">user 1</p>
        <p className="text-sm">9 victorias</p>
      </div>

      {/* Resto del ranking */}
      <div className="flex items-center justify-between mb-2 border-b border-gray-600 py-2">
        <div className="flex items-center gap-2">
          <span className="text-orange-400 font-bold w-5 text-center">2°</span>
          <Profile className="w-10" variant={2} />
          <p>user 2</p>
        </div>
        <p>7 victorias</p>
      </div>

      <div className="flex items-center justify-between mb-2 border-b border-gray-600 py-2">
        <div className="flex items-center gap-2">
          <span className="text-orange-400 font-bold w-5 text-center">3°</span>
          <Profile className="w-10" variant={1} />
          <p>user 3</p>
        </div>
        <p>6 victorias</p>
      </div>

      <div className="flex items-center justify-between mb-2 border-b border-gray-600 py-2">
        <div className="flex items-center gap-2">
          <span className="text-orange-400 font-bold w-5 text-center">4°</span>
          <Profile className="w-10" variant={5} />
          <p>user 4</p>
        </div>
        <p>5 victorias</p>
      </div>

      <div className="flex items-center justify-between mb-2 border-b border-gray-600 py-2">
        <div className="flex items-center gap-2">
          <span className="text-orange-400 font-bold w-5 text-center">5°</span>
          <Profile className="w-10" variant={6} />
          <p>user 5</p>
        </div>
        <p>5 victorias</p>
      </div>

      <div className="flex items-center justify-between mb-2 border-b border-gray-600 py-2">
        <div className="flex items-center gap-2">
          <span className="text-orange-400 font-bold w-5 text-center">6°</span>
          <Profile className="w-10" variant={7} />
          <p>user 6</p>
        </div>
        <p>5 victorias</p>
      </div>

      {/* Espacio para botón de cerrar si quieres agregarlo luego */}
      <div className="w-full flex justify-center mt-6"></div>
    </div>
  );
}

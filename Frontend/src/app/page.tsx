"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [showRanking, setShowRanking] = useState(false);

  return (
    <div className="relative flex flex-row h-screen text-white">
      {/* <div className="absolute top-6 right-6 z-50">
        <button
          onClick={() => setShowRanking(true)}
          className="px-4 py-2 bg-white text-black font-bold rounded-lg shadow-md hover:bg-gray-200 transition"
        >
          <Trophy className="w-6 h-6 text-yellow-500" />
        </button>
      </div> */}

      {/* {showRanking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="relative">
            <GlobalRanking />
            <button
              onClick={() => setShowRanking(false)}
              className="absolute -top-4 -right-4 bg-white text-black rounded-full w-8 h-8 flex items-center justify-center font-bold shadow hover:bg-red-200"
            >
              ×
            </button>
          </div>
        </div>
      )} */}

      <div className="w-1/2 h-full relative">
        <Image
          src="/img/Home-Vegeta.png"
          alt="Home-Vegeta"
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className="w-1/2 flex items-center justify-center">
        <Link
          href="/game/waiting-room"
          className="px-24 py-10 text-4xl font-bold rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg shadow-orange-500/50 hover:shadow-xl hover:shadow-yellow-400/60 hover:scale-105 transition-all duration-300 ease-in-out border-4 border-yellow-600"
        >
          JUGAR
        </Link>
      </div>
    </div>
  );
}

import Image from "next/image";

import image from "@/assets/img/Home-Vegeta.png";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-row h-screen text-white">
      {/* MITAD IZQUIERDA: IMAGEN */}
      {/* Este div ocupa la mitad del ancho (w-1/2) y toda la altura (h-full). */}
      {/* 'relative' es necesario para que 'layout="fill"' de next/image funcione correctamente. */}
      <div className="w-1/2 h-full relative">
        <Image
          src={image}
          alt="Home-Vegeta"
          layout="fill" // Esta propiedad de next/image hace que la imagen llene el contenedor padre.
          objectFit="fit" // Esto es como 'object-cover' en CSS. Evita que la imagen se deforme al rellenar el espacio.
        />
      </div>

      {/* MITAD DERECHA: BOTÓN */}
      {/* Este div ocupa la otra mitad del ancho y usa flexbox para centrar el botón en su interior. */}
      <div className="w-1/2 flex items-center justify-center">
        <Link
          href="/game/waiting-room"
          className="
        px-24 py-10 text-4xl font-bold rounded-full
        bg-gradient-to-r from-yellow-500 to-orange-500
        text-white shadow-lg shadow-orange-500/50
        hover:shadow-xl hover:shadow-yellow-400/60
        hover:scale-105
        transition-all duration-300 ease-in-out
        border-4 border-yellow-600
        "
        >
          JUGAR
        </Link>
      </div>
    </div>
  );
}

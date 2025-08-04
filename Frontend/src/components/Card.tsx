"use client";

import type { CardType } from "@/types/card.type";
import {
  Zap,
  Shield,
  Gauge,
  Heart,
  Star,
  Flame,
  type LucideProps,
} from "lucide-react";
import type React from "react";


const cards: CardType[] = [
  {
    id: 1,
    name: "Goku Super Saiyan",
    image: "/placeholder.svg?height=200&width=150",
    attributes: {
      attack: 95,
      defense: 80,
      speed: 90,
      ki: 100,
      stamina: 85,
      special: 98,
    },
    description: "El legendario guerrero Saiyan que protege la Tierra",
  },
  {
    id: 2,
    name: "Vegeta Príncipe",
    image: "/placeholder.svg?height=200&width=150",
    attributes: {
      attack: 92,
      defense: 85,
      speed: 88,
      ki: 95,
      stamina: 90,
      special: 94,
    },
    description: "El orgulloso príncipe de los Saiyans",
  },
  {
    id: 3,
    name: "Piccolo",
    image: "/placeholder.svg?height=200&width=150",
    attributes: {
      attack: 75,
      defense: 90,
      speed: 70,
      ki: 85,
      stamina: 95,
      special: 80,
    },
    description: "El guerrero Namekiano y mentor de Gohan",
  },
  {
    id: 4,
    name: "Frieza Forma Final",
    image: "/placeholder.svg?height=200&width=150",
    attributes: {
      attack: 88,
      defense: 70,
      speed: 95,
      ki: 92,
      stamina: 75,
      special: 90,
    },
    description: "El emperador del universo en su forma más poderosa",
  },
];

const AttributeBar = ({
  icon: Icon,
  label,
  value,
  maxValue = 100,
}: {
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  label: string;
  value: number;
  maxValue?: number;
}) => {
  const percentage = (value / maxValue) * 100;

  return (
    <div className="flex items-center gap-2 mb-1">
      <Icon className="w-3 h-3 text-orange-400" />
      <span className="text-xs font-medium text-white min-w-[60px]">
        {label}
      </span>
      <div className="flex-1 bg-gray-700 rounded-full h-2 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-orange-400 to-red-500 transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-xs font-bold text-white min-w-[25px] text-right">
        {value}
      </span>
    </div>
  );
};

export default function Card ({ card, className, ...props }: { card: CardType, className?: string, onClick?: () => void }) {
  return (
    <div
      key={card.id}
      className={`relative aspect-[5/8] w-76 overflow-hidden bg-zinc-950 border-4 border-amber-600 rounded-2xl shadow-2xl transition-transform duration-300 ${className}`}
      {...props}
    >
      <div className="p-0 relative">
        {/* Header */}
        <div className="p-3 border-b border-yellow-500">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-white text-sm truncate">
              {card.name}
            </h3>
          </div>
        </div>

        {/* Character Image */}
        <div className="relative h-48 bg-zinc-500 overflow-hidden">
          <img
            src={card.image || "/placeholder.svg"}
            alt={card.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>

        {/* Attributes */}
        <div className="p-3">
          <h4 className="text-xs font-bold text-yellow-400 mb-2 text-center">
            ATRIBUTOS
          </h4>
          <div className="space-y-1">
            <AttributeBar
              icon={Zap}
              label="Ataque"
              value={card.attributes.attack}
            />
            <AttributeBar
              icon={Shield}
              label="Defensa"
              value={card.attributes.defense}
            />
            <AttributeBar
              icon={Gauge}
              label="Velocidad"
              value={card.attributes.speed}
            />
            <AttributeBar icon={Flame} label="Ki" value={card.attributes.ki} />
            <AttributeBar
              icon={Heart}
              label="Resistencia"
              value={card.attributes.stamina}
            />
            <AttributeBar
              icon={Star}
              label="Especial"
              value={card.attributes.special}
            />
          </div>
        </div>

        {/* Description */}
        <div className="p-3 border-t-2 border-amber-600">
          <p className="text-xs text-gray-300 text-center italic">
            {card.description}
          </p>
        </div>

        {/* Card Number */}
        <div className="absolute top-2 right-2 text-yellow-400 text-xs px-2 py-1 rounded-full font-bold">
          #{card.id.toString().padStart(3, "0")}
        </div>
      </div>
    </div>
  );
};

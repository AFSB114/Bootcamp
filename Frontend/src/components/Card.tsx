"use client";

import {Attributes, CardType} from "@/types/card.type";
import {
  Zap,
  Shield,
  Gauge,
  Heart,
  Star,
  Flame,
  type LucideProps,
} from "lucide-react";
import Image from "next/image";
import React, { useCallback, useEffect, useState} from "react";

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

export default function Card({card, className, attributeSelected, handleSelectCard}: {
    card: CardType,
    className?: string,
    onClick?: (e: React.ChangeEvent<HTMLDivElement>) => void,
    attributeSelected?: Attributes | null,
    handleSelectCard?: (attributeSelectedValue: number, cardId: number) => void
}) {
  
  const [attributeSelectedValue, setAttributeSelectedValue] = useState<number>(0);

  useEffect(() => {
    setAttributeSelectedValue(attributeSelected ? card.attributes[attributeSelected] : -1);
  },[setAttributeSelectedValue, attributeSelected, card.attributes])

  const handleClick = useCallback(()=>{
    if (!handleSelectCard)return
      handleSelectCard(attributeSelectedValue, card.id)
  }, [handleSelectCard, card.id, attributeSelectedValue]);

  return (
    <div
      key={card.id}
      className={`relative aspect-[6/10] w-76 overflow-hidden bg-zinc-950 border-4 border-amber-600 rounded-2xl shadow-2xl transition-transform duration-300 ${className}`}
      onClick={handleClick}
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
        <div className="relative h-56 bg-zinc-500 overflow-hidden">
          <Image
            src={`${card.image}` || "/placeholder.svg"}
            alt={card.name}
            className="w-full h-full object-cover object-top"
            layout="fill"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>

        {/* Attributes */}
        <div className="p-3">
          <h4 className="text-xs font-bold text-yellow-400 mb-2 text-center">
            ATTRIBUTOS
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

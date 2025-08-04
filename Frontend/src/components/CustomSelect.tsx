"use client";

import { ChevronDownIcon } from "lucide-react";
import type { ChangeEvent } from "react";

export default function CustomSelect({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    value: string;
    id: string;
}) {
  return (
    <div className="relative w-full">
      <select
        {...props}
        className={`w-full appearance-none bg-zinc-900 border-2 border-zinc-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors duration-200 ${className}`}
      >
        {children}
      </select>
      {/* Este es nuestro icono de flecha personalizado. */}
      <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
        <ChevronDownIcon className="w-5 h-5 text-zinc-400" />
      </div>
    </div>
  );
};

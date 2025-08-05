// components/Modal.tsx
"use client";

import { useEffect, useState, MouseEvent, type ReactNode } from "react";


export default function Modal({ isOpen, onClose, children, backdrop = true }: { isOpen: boolean, onClose: () => void, children: ReactNode, backdrop?: boolean }) {
  const [isRendering, setIsRendering] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsRendering(true);
    } else {
      const timer = setTimeout(() => setIsRendering(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isRendering) {
    return null;
  }

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && backdrop) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleBackdropClick}
      className={`fixed inset-0 z-50 flex items-center justify-center transition-colors duration-300 ease-in-out ${isOpen ? "bg-black/60" : "bg-transparent"}
      `}
    >
      <div
        className={`relative transition-all duration-300 ease-in-out ${isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"}
        `}
      >
        {children}
      </div>
    </div>
  );
}

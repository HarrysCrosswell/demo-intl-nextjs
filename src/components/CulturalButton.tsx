"use client";

import React from "react";
import { useCultural } from "@/contexts/CulturalContext";
import { CulturalColors } from "@/types/cultural";

interface CulturalButtonProps {
  type?: keyof CulturalColors;
  variant?: "solid" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export default function CulturalButton({
  type = "primary",
  variant = "solid",
  size = "md",
  children,
  onClick,
  disabled = false,
  className = "",
}: CulturalButtonProps) {
  const { currentTheme } = useCultural();

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "px-3 py-1.5 text-sm";
      case "md":
        return "px-4 py-2 text-base";
      case "lg":
        return "px-6 py-3 text-lg";
      default:
        return "px-4 py-2 text-base";
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case "solid":
        return `bg-cultural-${type} text-white hover:opacity-90`;
      case "outline":
        return `border-2 border-cultural-${type} text-cultural-${type} bg-transparent hover:bg-cultural-${type} hover:text-white`;
      case "ghost":
        return `text-cultural-${type} bg-transparent hover:bg-cultural-${type}-light`;
      default:
        return `bg-cultural-${type} text-white hover:opacity-90`;
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${getSizeClasses()}
        ${getVariantClasses()}
        rounded-lg font-medium transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
      style={{
        direction: currentTheme.preferences.layoutDirection,
      }}
    >
      {children}
    </button>
  );
}

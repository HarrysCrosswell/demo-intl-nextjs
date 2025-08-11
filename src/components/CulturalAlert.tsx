"use client";

import React from "react";
import { useCultural } from "@/contexts/CulturalContext";
import { CulturalColors } from "@/types/cultural";

interface CulturalAlertProps {
  type: keyof CulturalColors;
  message: string;
  className?: string;
  showIcon?: boolean;
}

export default function CulturalAlert({
  type,
  message,
  className = "",
  showIcon = true,
}: CulturalAlertProps) {
  const { currentTheme, getTextColorClass } = useCultural();

  // Get cultural icon based on error style and type
  const getIcon = () => {
    if (!showIcon) return null;

    const isEastern = currentTheme.preferences.errorIconStyle === "eastern";

    switch (type) {
      case "error":
        return isEastern ? "⚠️" : "❌";
      case "warning":
        return isEastern ? "注意" : "⚠️";
      case "success":
        // In Chinese culture, red is used for success/luck
        if (currentTheme.locale === "zh") {
          return "🎉"; // More celebratory for Chinese success
        }
        return isEastern ? "✓" : "✅";
      case "info":
        return isEastern ? "ℹ" : "ℹ️";
      default:
        return "•";
    }
  };

  // Get background and border classes using cultural CSS variables
  const getAlertClasses = () => {
    return `bg-cultural-${type}-light border border-cultural-${type}-light`;
  };

  return (
    <div
      className={`
        p-3 rounded-lg border
        ${getAlertClasses()}
        ${className}
      `}
      style={{
        direction: currentTheme.preferences.layoutDirection,
        backgroundColor: `rgb(var(--cultural-${type}) / 0.1)`,
        borderColor: `rgb(var(--cultural-${type}) / 0.3)`,
      }}
    >
      <div className="flex items-center gap-2">
        {getIcon() && (
          <span className="text-lg flex-shrink-0" role="img" aria-hidden="true">
            {getIcon()}
          </span>
        )}
        <p className={`text-sm font-medium ${getTextColorClass(type)}`}>
          {message}
        </p>
      </div>
    </div>
  );
}

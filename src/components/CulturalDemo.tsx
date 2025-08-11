"use client";

import React, { useState } from "react";
import { useCultural } from "@/contexts/CulturalContext";
import { useTranslations } from "next-intl";
import CulturalAlert from "./CulturalAlert";
import CulturalButton from "./CulturalButton";

export default function CulturalDemo() {
  const { currentTheme, formatNumber, formatDate, formatCurrency } =
    useCultural();
  const t = useTranslations();
  const [showDemo, setShowDemo] = useState(false);

  const demoData = {
    numbers: [1234567.89, 999.99, 12345],
    dates: [
      new Date("2024-01-15"),
      new Date("2024-12-25"),
      new Date("2024-07-04"),
    ],
    currencies: [
      { amount: 999.99, symbol: "$" },
      { amount: 1299.5, symbol: "€" },
      { amount: 15000, symbol: "¥" },
    ],
  };

  return (
    <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            🌍 Cultural Localization Showcase
          </h2>
          <p className="text-xl text-gray-600 mb-6">
            See how your interface adapts to different cultures beyond just
            language
          </p>
          <CulturalButton
            type="primary"
            size="lg"
            onClick={() => setShowDemo(!showDemo)}
          >
            {showDemo ? "Hide" : "Show"} Cultural Demo
          </CulturalButton>
        </div>

        {showDemo && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in">
            {/* Color Showcase */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                🎨 Cultural Color Schemes
              </h3>

              {/* Current Culture Info */}
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h4 className="font-medium text-gray-700 mb-2">
                  Current Culture: {currentTheme.culturalRegion}
                </h4>
                <p className="text-sm text-gray-600">
                  {currentTheme.locale === "zh" &&
                    "🇨🇳 In Chinese culture, red symbolizes luck and prosperity, so we use orange for errors!"}
                  {currentTheme.locale === "ar" &&
                    "🇸🇦 In Arabic culture, green has very positive connotations in Islamic tradition."}
                  {currentTheme.locale === "ja" &&
                    "🇯🇵 Japanese culture values indigo (藍), a traditional color of Japan."}
                  {!["zh", "ar", "ja"].includes(currentTheme.locale) &&
                    "🌍 Using standard Western color associations."}
                </p>
              </div>

              <div className="space-y-4">
                <CulturalAlert
                  type="error"
                  message={`Error: ${currentTheme.locale === "zh" ? "Orange (red is for luck!)" : "Red as expected"}`}
                />
                <CulturalAlert
                  type="success"
                  message={`Success: ${currentTheme.locale === "zh" ? "Red (lucky color!)" : currentTheme.locale === "ar" ? "Green (blessed color)" : "Green as expected"}`}
                />
                <CulturalAlert
                  type="warning"
                  message="Warning: Amber/yellow across all cultures"
                />
                <CulturalAlert
                  type="info"
                  message="Info: Blue is universally understood"
                />
              </div>

              {/* Button Examples */}
              <div className="mt-6 space-y-3">
                <h4 className="font-medium text-gray-700">Button Styles:</h4>
                <div className="flex flex-wrap gap-2">
                  <CulturalButton type="primary" variant="solid">
                    Primary
                  </CulturalButton>
                  <CulturalButton type="success" variant="outline">
                    Success
                  </CulturalButton>
                  <CulturalButton type="error" variant="ghost">
                    Error
                  </CulturalButton>
                  <CulturalButton type="warning" variant="solid" size="sm">
                    Warning
                  </CulturalButton>
                </div>
              </div>
            </div>

            {/* Formatting Showcase */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                🔢 Cultural Formatting
              </h3>

              {/* Numbers */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Numbers:</h4>
                <div className="space-y-2">
                  {demoData.numbers.map((num, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                    >
                      <span className="text-sm text-gray-600">
                        {num.toLocaleString("en-US")}:
                      </span>
                      <span className="text-lg font-mono text-cultural-primary font-semibold">
                        {formatNumber(num)}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Thousands: "
                  {currentTheme.preferences.formatting.numberThousandsSeparator}
                  " | Decimal: "
                  {currentTheme.preferences.formatting.numberDecimalSeparator}"
                </p>
              </div>

              {/* Dates */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Dates:</h4>
                <div className="space-y-2">
                  {demoData.dates.map((date, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                    >
                      <span className="text-sm text-gray-600">
                        {date.toLocaleDateString("en-US")}:
                      </span>
                      <span className="text-lg font-mono text-cultural-info font-semibold">
                        {formatDate(date)}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Format: {currentTheme.preferences.formatting.dateFormat}
                </p>
              </div>

              {/* Currency */}
              <div>
                <h4 className="font-medium text-gray-700 mb-3">Currency:</h4>
                <div className="space-y-2">
                  {demoData.currencies.map((curr, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                    >
                      <span className="text-sm text-gray-600">
                        {curr.symbol}
                        {curr.amount}:
                      </span>
                      <span className="text-lg font-mono text-cultural-success font-semibold">
                        {formatCurrency(curr.amount, curr.symbol)}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Position:{" "}
                  {currentTheme.preferences.formatting.currencyPosition}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Cultural Insights */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
            🧠 Cultural Insights for {currentTheme.locale.toUpperCase()}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl mb-2">🗺️</div>
              <h4 className="font-medium text-gray-700">Region</h4>
              <p className="text-sm text-gray-600 capitalize">
                {currentTheme.culturalRegion.replace("-", " ")}
              </p>
            </div>

            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl mb-2">👁️</div>
              <h4 className="font-medium text-gray-700">Reading Pattern</h4>
              <p className="text-sm text-gray-600 capitalize">
                {currentTheme.preferences.readingPattern.replace("-", " ")}
              </p>
            </div>

            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl mb-2">📐</div>
              <h4 className="font-medium text-gray-700">Content Density</h4>
              <p className="text-sm text-gray-600 capitalize">
                {currentTheme.preferences.contentDensity}
              </p>
            </div>

            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl mb-2">🔤</div>
              <h4 className="font-medium text-gray-700">Layout Direction</h4>
              <p className="text-sm text-gray-600 uppercase">
                {currentTheme.preferences.layoutDirection}
              </p>
            </div>
          </div>

          {/* Special Cultural Notes */}
          <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-3">
              💡 Cultural Notes:
            </h4>
            <div className="text-sm text-gray-700 space-y-2">
              {currentTheme.locale === "zh" && (
                <div>
                  <p>
                    🏮 <strong>Chinese Culture:</strong> Red (红色) represents
                    luck, prosperity, and joy. It's used for celebrations,
                    success, and positive messaging.
                  </p>
                  <p>
                    ⚠️ <strong>Error Handling:</strong> Orange is used for
                    errors to avoid negative associations with the lucky red
                    color.
                  </p>
                </div>
              )}
              {currentTheme.locale === "ar" && (
                <div>
                  <p>
                    🕌 <strong>Arabic/Islamic Culture:</strong> Green represents
                    paradise, nature, and is considered a blessed color in
                    Islamic tradition.
                  </p>
                  <p>
                    📖 <strong>Layout:</strong> Right-to-left reading direction
                    affects the entire UI layout.
                  </p>
                </div>
              )}
              {currentTheme.locale === "ja" && (
                <div>
                  <p>
                    🗾 <strong>Japanese Culture:</strong> Indigo (藍/ai) is a
                    traditional Japanese color representing depth and stability.
                  </p>
                  <p>
                    🏯 <strong>Design:</strong> Compact design reflects Japanese
                    aesthetic preferences for efficient use of space.
                  </p>
                </div>
              )}
              {currentTheme.locale === "fr" && (
                <p>
                  🇫🇷 <strong>French Culture:</strong> Uses European date format
                  (DD/MM/YYYY) and 24-hour time format. Currency appears after
                  the amount.
                </p>
              )}
              {currentTheme.locale === "de" && (
                <p>
                  🇩🇪 <strong>German Culture:</strong> Uses dot notation for
                  dates (DD.MM.YYYY) and German number formatting with dots for
                  thousands.
                </p>
              )}
              {!["zh", "ar", "ja", "fr", "de"].includes(
                currentTheme.locale,
              ) && (
                <p>
                  🌍 <strong>Standard Western Culture:</strong> Traditional red
                  for errors, green for success, with familiar formatting
                  patterns.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </section>
  );
}

"use client";

import React from "react";
import { useCultural } from "@/contexts/CulturalContext";
import CulturalAlert from "./CulturalAlert";

export default function CulturalShowcase() {
  const { currentTheme, formatNumber, formatDate, formatCurrency } =
    useCultural();

  const demoNumber = 1234567.89;
  const demoDate = new Date("2024-12-25");
  const demoCurrency = 999.99;

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Cultural Localization Showcase
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Color Schemes */}
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4">
                Cultural Color Schemes
              </h4>
              <div className="space-y-3">
                <CulturalAlert
                  type="error"
                  message={`Error messages ${currentTheme.locale === "zh" ? "use orange (red is lucky!)" : "use red"}`}
                />
                <CulturalAlert
                  type="success"
                  message={`Success messages ${currentTheme.locale === "zh" ? "use red (lucky color!)" : "use green"}`}
                />
                <CulturalAlert
                  type="warning"
                  message="Warning messages use amber/yellow"
                />
                <CulturalAlert type="info" message="Info messages use blue" />
              </div>
            </div>

            {/* Formatting Examples */}
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4">
                Cultural Formatting
              </h4>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-medium text-gray-700 mb-2">Numbers</h5>
                  <p className="text-sm text-gray-600">
                    <span className="font-mono">
                      {formatNumber(demoNumber)}
                    </span>
                    <br />
                    <span className="text-xs text-gray-500">
                      Thousands: "
                      {
                        currentTheme.preferences.formatting
                          .numberThousandsSeparator
                      }
                      " | Decimal: "
                      {
                        currentTheme.preferences.formatting
                          .numberDecimalSeparator
                      }
                      "
                    </span>
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-medium text-gray-700 mb-2">Dates</h5>
                  <p className="text-sm text-gray-600">
                    <span className="font-mono">{formatDate(demoDate)}</span>
                    <br />
                    <span className="text-xs text-gray-500">
                      Format: {currentTheme.preferences.formatting.dateFormat}
                    </span>
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-medium text-gray-700 mb-2">Currency</h5>
                  <p className="text-sm text-gray-600">
                    <span className="font-mono">
                      {formatCurrency(demoCurrency, "$")}
                    </span>
                    <br />
                    <span className="text-xs text-gray-500">
                      Position:{" "}
                      {currentTheme.preferences.formatting.currencyPosition}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Cultural Preferences */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">
              Cultural Preferences for {currentTheme.locale.toUpperCase()}
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">Region:</span>
                <p className="text-gray-600">{currentTheme.culturalRegion}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">
                  Reading Pattern:
                </span>
                <p className="text-gray-600">
                  {currentTheme.preferences.readingPattern}
                </p>
              </div>
              <div>
                <span className="font-medium text-gray-700">
                  Content Density:
                </span>
                <p className="text-gray-600">
                  {currentTheme.preferences.contentDensity}
                </p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Icon Style:</span>
                <p className="text-gray-600">
                  {currentTheme.preferences.errorIconStyle}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

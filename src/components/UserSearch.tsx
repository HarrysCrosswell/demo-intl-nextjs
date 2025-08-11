"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { userApi } from "@/services/userApi";
import { User } from "@/types/user";
import UserCard from "./UserCard";
import CulturalAlert from "./CulturalAlert";
import { useCultural } from "@/contexts/CulturalContext";

export default function UserSearch() {
  const t = useTranslations("userSearch");
  const locale = useLocale();
  const { currentTheme } = useCultural();

  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string>("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous results
    setError("");
    setUser(null);

    // Validate input
    if (!userId.trim()) {
      setError(t("userIdRequired"));
      return;
    }

    setLoading(true);

    try {
      const response = await userApi.getUser(userId.trim(), locale);
      console.log("Retrieved user:", response.data);
      setUser(response.data);
    } catch (err: any) {
      console.error("Search error:", err);

      if (err.status === 404) {
        setError(err.detail || t("userNotFound"));
      } else {
        setError(err.detail || t("errorOccurred"));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
    // Clear error when user starts typing
    if (error) setError("");
  };

  return (
    <section
      id="user-search"
      className="py-20 bg-gradient-to-br from-gray-50 to-blue-50"
      style={{ direction: currentTheme.preferences.layoutDirection }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t("title")}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        {/* Cultural Theme Indicator */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6 border">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            🌍 Cultural Theme: {currentTheme.culturalRegion}
            {currentTheme.locale === "zh" && " (Red = Lucky! 🍀)"}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded"
                style={{ backgroundColor: `rgb(var(--cultural-error))` }}
              ></div>
              <span className="text-xs text-gray-600">
                Error {currentTheme.locale === "zh" ? "(Orange)" : "(Red)"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded"
                style={{ backgroundColor: `rgb(var(--cultural-warning))` }}
              ></div>
              <span className="text-xs text-gray-600">Warning</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded"
                style={{ backgroundColor: `rgb(var(--cultural-success))` }}
              ></div>
              <span className="text-xs text-gray-600">
                Success {currentTheme.locale === "zh" ? "(Red!)" : "(Green)"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded"
                style={{ backgroundColor: `rgb(var(--cultural-info))` }}
              ></div>
              <span className="text-xs text-gray-600">Info</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded"
                style={{ backgroundColor: `rgb(var(--cultural-primary))` }}
              ></div>
              <span className="text-xs text-gray-600">Primary</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded"
                style={{ backgroundColor: `rgb(var(--cultural-secondary))` }}
              ></div>
              <span className="text-xs text-gray-600">Secondary</span>
            </div>
          </div>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <form onSubmit={handleSearch} className="space-y-6">
            <div>
              <label
                htmlFor="userId"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                {t("userIdLabel")}
              </label>
              <div className="flex gap-4">
                <input
                  type="text"
                  id="userId"
                  value={userId}
                  onChange={handleInputChange}
                  placeholder={t("userIdPlaceholder")}
                  className={`flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors ${
                    error ? "border-cultural-error" : "border-gray-300"
                  }`}
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 bg-cultural-primary text-white font-medium rounded-lg hover:opacity-90 focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {loading ? t("loading") : t("searchButton")}
                </button>
              </div>

              {/* Cultural Error Message */}
              {error && (
                <div className="mt-3">
                  <CulturalAlert type="error" message={error} />
                </div>
              )}
            </div>
          </form>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cultural-primary"></div>
            <span className="ml-3 text-gray-600 font-medium">
              {t("loading")}
            </span>
          </div>
        )}

        {/* User Card */}
        {user && !loading && (
          <div className="animate-fade-in">
            <UserCard user={user} />
            {/* Success message for finding user */}
            <div className="mt-4">
              <CulturalAlert
                type="success"
                message={`User found! Notice how success appears in ${currentTheme.locale === "zh" ? "red (lucky color in Chinese culture)" : "green"}.`}
              />
            </div>
          </div>
        )}

        {/* Sample User IDs */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 mb-2">Sample User IDs to try:</p>
          <div className="flex justify-center gap-2 flex-wrap">
            {["1", "2", "3"].map((id) => (
              <button
                key={id}
                onClick={() => {
                  setUserId(id);
                  setError("");
                }}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200 transition-colors"
              >
                {id}
              </button>
            ))}
          </div>
        </div>

        {/* Cultural Demo Section */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            🎨 Cultural Localization Demo
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">
                Alert Examples:
              </h4>
              <div className="space-y-3">
                <CulturalAlert
                  type="error"
                  message="This is an error message"
                />
                <CulturalAlert
                  type="warning"
                  message="This is a warning message"
                />
                <CulturalAlert
                  type="success"
                  message="This is a success message"
                />
                <CulturalAlert type="info" message="This is an info message" />
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">
                Cultural Information:
              </h4>
              <div className="text-sm text-gray-600 space-y-2">
                <div className="flex justify-between">
                  <span>Region:</span>
                  <span className="font-medium">
                    {currentTheme.culturalRegion}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Reading Pattern:</span>
                  <span className="font-medium">
                    {currentTheme.preferences.readingPattern}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Content Density:</span>
                  <span className="font-medium">
                    {currentTheme.preferences.contentDensity}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Error Style:</span>
                  <span className="font-medium">
                    {currentTheme.preferences.errorIconStyle}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Layout Direction:</span>
                  <span className="font-medium">
                    {currentTheme.preferences.layoutDirection.toUpperCase()}
                  </span>
                </div>
              </div>
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
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </section>
  );
}

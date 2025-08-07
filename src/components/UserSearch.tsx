"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { userApi } from "@/services/userApi";
import { User } from "@/types/user";
import UserCard from "./UserCard";

export default function UserSearch() {
  const t = useTranslations("userSearch");
  const locale = useLocale();

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
                    error ? "border-red-500" : "border-gray-300"
                  }`}
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? t("loading") : t("searchButton")}
                </button>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 text-sm font-medium">⚠️ {error}</p>
                </div>
              )}
            </div>
          </form>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600 font-medium">
              {t("loading")}
            </span>
          </div>
        )}

        {/* User Card */}
        {user && !loading && (
          <div className="animate-fade-in">
            <UserCard user={user} />
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

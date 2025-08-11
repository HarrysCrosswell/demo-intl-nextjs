"use client";

import { useTranslations } from "next-intl";
import { User } from "@/types/user";
import { useCultural } from "@/contexts/CulturalContext";

interface UserCardProps {
  user: User;
}

export default function UserCard({ user }: UserCardProps) {
  const t = useTranslations("userSearch.userCard");
  const { currentTheme, formatDate, formatNumber } = useCultural();

  // Calculate age with cultural awareness
  const calculateAge = (birthDate: string) => {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }

    return age;
  };

  const culturalAge = calculateAge(user.birth_date);

  return (
    <div
      className="bg-white rounded-xl shadow-lg overflow-hidden"
      style={{
        direction: currentTheme.preferences.layoutDirection,
      }}
    >
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-white">{t("title")}</h3>
          <div className="text-white/80 text-sm">
            ID: {formatNumber(parseInt(user.id))}
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                {t("firstName")}
              </label>
              <p className="text-lg font-semibold text-gray-900">
                {user.first_name}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                {t("lastName")}
              </label>
              <p className="text-lg font-semibold text-gray-900">
                {user.last_name}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                {t("age")}
              </label>
              <p className="text-lg font-semibold text-gray-900">
                {culturalAge} {t("yearsOld")}
              </p>
            </div>
          </div>

          {/* Dates with Cultural Formatting */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                {t("birthDate")}
              </label>
              <p className="text-lg font-semibold text-gray-900">
                {formatDate(user.birth_date)}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Format: {currentTheme.preferences.formatting.dateFormat}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                {t("createdAt")}
              </label>
              <p className="text-lg font-semibold text-gray-900">
                {formatDate(user.created_at)}
              </p>
            </div>
          </div>
        </div>

        {/* Cultural Information Footer */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Cultural Region: {currentTheme.culturalRegion}</span>
            <span>
              Layout: {currentTheme.preferences.layoutDirection.toUpperCase()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

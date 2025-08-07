import { useTranslations, useLocale } from "next-intl";
import { User } from "@/types/user";

interface UserCardProps {
  user: User;
}

export default function UserCard({ user }: UserCardProps) {
  const t = useTranslations("userSearch.userCard");
  const locale = useLocale();

  // Format dates according to locale
  const formatDate = (dateString: string, includeTime = false) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      ...(includeTime && {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    return new Intl.DateTimeFormat(locale, options).format(date);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto border border-gray-200">
      <div className="flex items-center mb-4">
        <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mr-4">
          <span className="text-white text-xl font-bold">
            {user.first_name[0]}
            {user.last_name[0]}
          </span>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{t("title")}</h3>
          <p className="text-gray-600">ID: {user.id}</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="font-medium text-gray-700">{t("firstName")}:</span>
          <span className="text-gray-900">{user.first_name}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium text-gray-700">{t("lastName")}:</span>
          <span className="text-gray-900">{user.last_name}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium text-gray-700">{t("age")}:</span>
          <span className="text-gray-900">
            {user.age} {t("yearsOld")}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium text-gray-700">{t("birthDate")}:</span>
          <span className="text-gray-900">{formatDate(user.birth_date)}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium text-gray-700">{t("createdAt")}:</span>
          <span className="text-gray-900">
            {formatDate(user.created_at, true)}
          </span>
        </div>
      </div>
    </div>
  );
}

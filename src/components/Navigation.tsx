"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";

interface NavigationProps {
  onMenuClick: (sectionId: string) => void;
}

export default function Navigation({ onMenuClick }: NavigationProps) {
  const t = useTranslations("navigation");

  return (
    <nav className="fixed top-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Image
              className="dark:invert"
              src="/next.svg"
              alt="Logo"
              width={120}
              height={24}
              priority
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-baseline space-x-8">
              <button
                onClick={() => onMenuClick("home")}
                className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                {t("home")}
              </button>
              <button
                onClick={() => onMenuClick("team")}
                className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                {t("team")}
              </button>
              <button
                onClick={() => onMenuClick("pricing")}
                className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                {t("pricing")}
              </button>
              <button
                onClick={() => onMenuClick("contacts")}
                className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                {t("contacts")}
              </button>
            </div>

            {/* Language Switcher */}
            <LanguageSwitcher />
          </div>

          {/* Mobile menu button (you can implement mobile menu later) */}
          <div className="md:hidden flex items-center space-x-4">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </nav>
  );
}

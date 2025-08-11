"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";
import Navigation from "../../components/Navigation";
import UserSearch from "../../components/UserSearch";
import CulturalShowcase from "../../components/CulturalShowcase";
import CulturalDemo from "../../components/CulturalDemo";
import { useCultural } from "../../contexts/CulturalContext";

export default function Home() {
  const t = useTranslations();
  const { currentTheme, formatCurrency } = useCultural();
  const [formData, setFormData] = useState({
    email: "",
    message: "",
  });

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert(t("contact.success"));
    setFormData({ email: "", message: "" });
  };

  return (
    <div
      className="min-h-screen bg-white"
      style={{ direction: currentTheme.preferences.layoutDirection }}
    >
      {/* Navigation with Language Switcher */}
      <Navigation onMenuClick={scrollToSection} />

      {/* Main Content */}
      <main className="pt-16">
        {/* Home Section */}
        <section
          id="home"
          className="py-20 bg-gradient-to-r from-blue-50 to-indigo-100"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              {t("home.title")}
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              {t("home.subtitle")}
            </p>
            <button
              onClick={() => scrollToSection("contacts")}
              className="bg-cultural-primary text-white px-8 py-3 rounded-lg font-medium hover:opacity-90 transition-all"
            >
              {t("home.cta")}
            </button>
          </div>
        </section>

        {/* Cultural Demo Section */}
        {/* <CulturalDemo /> */}

        {/* Cultural Showcase Section */}
        {/* <CulturalShowcase /> */}

        {/* Our Team Section */}
        <section id="team" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              {t("team.title")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  John Doe
                </h3>
                <p className="text-gray-600">{t("team.ceo")}</p>
              </div>
              <div className="text-center">
                <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Jane Smith
                </h3>
                <p className="text-gray-600">{t("team.cto")}</p>
              </div>
              <div className="text-center">
                <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Mike Johnson
                </h3>
                <p className="text-gray-600">{t("team.lead")}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section with Cultural Colors */}
        <section id="pricing" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              {t("pricing.title")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {t("pricing.basic")}
                </h3>
                <p className="text-4xl font-bold text-cultural-primary mb-6">
                  {formatCurrency(29, "$")}
                  <span className="text-lg text-gray-500">
                    {t("pricing.month")}
                  </span>
                </p>
                <ul className="text-gray-600 mb-8 space-y-2">
                  <li>✓ {t("pricing.features.projects", { count: 5 })}</li>
                  <li>✓ {t("pricing.features.basicSupport")}</li>
                  <li>✓ {t("pricing.features.storage", { amount: "10GB" })}</li>
                </ul>
                <button className="w-full bg-cultural-primary text-white py-2 rounded-lg hover:opacity-90 transition-all">
                  {t("pricing.choose")}
                </button>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md border-2 border-cultural-primary">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {t("pricing.pro")}
                </h3>
                <p className="text-4xl font-bold text-cultural-primary mb-6">
                  {formatCurrency(59, "$")}
                  <span className="text-lg text-gray-500">
                    {t("pricing.month")}
                  </span>
                </p>
                <ul className="text-gray-600 mb-8 space-y-2">
                  <li>✓ {t("pricing.features.projects", { count: 20 })}</li>
                  <li>✓ {t("pricing.features.prioritySupport")}</li>
                  <li>✓ {t("pricing.features.storage", { amount: "50GB" })}</li>
                  <li>✓ {t("pricing.features.advanced")}</li>
                </ul>
                <button className="w-full bg-cultural-primary text-white py-2 rounded-lg hover:opacity-90 transition-all">
                  {t("pricing.choose")}
                </button>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {t("pricing.enterprise")}
                </h3>
                <p className="text-4xl font-bold text-cultural-primary mb-6">
                  {formatCurrency(99, "$")}
                  <span className="text-lg text-gray-500">
                    {t("pricing.month")}
                  </span>
                </p>
                <ul className="text-gray-600 mb-8 space-y-2">
                  <li>✓ {t("pricing.features.unlimited")}</li>
                  <li>✓ {t("pricing.features.support247")}</li>
                  <li>
                    ✓ {t("pricing.features.storage", { amount: "200GB" })}
                  </li>
                  <li>✓ {t("pricing.features.custom")}</li>
                </ul>
                <button className="w-full bg-cultural-primary text-white py-2 rounded-lg hover:opacity-90 transition-all">
                  {t("pricing.choose")}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* User Search Section */}
        <UserSearch />

        {/* Contacts Section with Cultural Styling */}
        <section id="contacts" className="py-20 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              {t("contact.title")}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {t("contact.email")}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cultural-primary focus:border-transparent"
                  placeholder={t("contact.emailPlaceholder")}
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {t("contact.message")}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cultural-primary focus:border-transparent"
                  placeholder={t("contact.messagePlaceholder")}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-cultural-primary text-white py-3 rounded-lg font-medium hover:opacity-90 transition-all"
              >
                {t("contact.send")}
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* Footer with Cultural Styling */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <Image
                className="invert mb-4"
                src="/next.svg"
                alt="Logo"
                width={120}
                height={24}
              />
              <p className="text-gray-400">{t("footer.description")}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">
                {t("footer.quickLinks")}
              </h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <button
                    onClick={() => scrollToSection("home")}
                    className="hover:text-cultural-primary transition-colors"
                  >
                    {t("navigation.home")}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("team")}
                    className="hover:text-cultural-primary transition-colors"
                  >
                    {t("navigation.team")}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("pricing")}
                    className="hover:text-cultural-primary transition-colors"
                  >
                    {t("navigation.pricing")}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("contacts")}
                    className="hover:text-cultural-primary transition-colors"
                  >
                    {t("navigation.contacts")}
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">
                {t("footer.followUs")}
              </h3>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-cultural-primary transition-colors"
                >
                  Twitter
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-cultural-primary transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-cultural-primary transition-colors"
                >
                  GitHub
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-cultural-primary transition-colors"
                >
                  {t("footer.contactMe")}
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>{t("footer.copyright")}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";
import Navigation from "../../components/Navigation";
import UserSearch from "../../components/UserSearch";

export default function Home() {
  const t = useTranslations();
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
    <div className="min-h-screen bg-white">
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
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              {t("home.cta")}
            </button>
          </div>
        </section>

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

        {/* Pricing Section */}
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
                <p className="text-4xl font-bold text-blue-600 mb-6">
                  $29
                  <span className="text-lg text-gray-500">
                    {t("pricing.month")}
                  </span>
                </p>
                <ul className="text-gray-600 mb-8 space-y-2">
                  <li>✓ {t("pricing.features.projects", { count: 5 })}</li>
                  <li>✓ {t("pricing.features.basicSupport")}</li>
                  <li>✓ {t("pricing.features.storage", { amount: "10GB" })}</li>
                </ul>
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  {t("pricing.choose")}
                </button>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-md border-2 border-blue-600">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {t("pricing.pro")}
                </h3>
                <p className="text-4xl font-bold text-blue-600 mb-6">
                  $59
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
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  {t("pricing.choose")}
                </button>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {t("pricing.enterprise")}
                </h3>
                <p className="text-4xl font-bold text-blue-600 mb-6">
                  $99
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
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  {t("pricing.choose")}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* User Search Section */}
        <UserSearch />

        {/* Contacts Section */}
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder={t("contact.messagePlaceholder")}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                {t("contact.send")}
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
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
                    className="hover:text-white"
                  >
                    {t("navigation.home")}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("team")}
                    className="hover:text-white"
                  >
                    {t("navigation.team")}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("pricing")}
                    className="hover:text-white"
                  >
                    {t("navigation.pricing")}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("contacts")}
                    className="hover:text-white"
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
                <a href="#" className="text-gray-400 hover:text-white">
                  Twitter
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  LinkedIn
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  GitHub
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

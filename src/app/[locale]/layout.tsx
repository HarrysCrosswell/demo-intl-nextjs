import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { CulturalProvider } from "@/contexts/CulturalContext";
import { culturalThemes, defaultCulturalTheme } from "@/i18n/cultural-themes";
import "../globals.css";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Await the params before using them
  const { locale } = await params;

  // Validate that the incoming `locale` parameter is valid
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Providing all messages to the client side
  const messages = await getMessages();
  const isRTL = locale === "ar";
  const culturalTheme = culturalThemes[locale] || defaultCulturalTheme;

  return (
    <html
      lang={locale}
      dir={isRTL ? "rtl" : "ltr"}
      data-cultural-theme={locale}
    >
      <head>
        <title>Multilingual App</title>
        <meta name="description" content="A multilingual NextJS application" />
      </head>
      <body className={isRTL ? "rtl" : "ltr"}>
        <NextIntlClientProvider messages={messages}>
          <CulturalProvider>{children}</CulturalProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

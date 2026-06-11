import type { Metadata } from "next";
import { Geist, Geist_Mono, Lora } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://diksyonekreyol.org"),
  title: {
    default:
      "Diksyonè Kreyòl — Haitian Creole Dictionary | Dictionnaire Créole Haïtien",
    template: "%s | Diksyonè Kreyòl",
  },
  description:
    "Diksyonè kreyòl ayisyen sou entènèt: definisyon, pwononsyasyon, sinonim, antonim, etimoloji ak egzanp. The free online Haitian Creole dictionary. Le dictionnaire créole haïtien en ligne.",
  keywords: [
    // Kreyòl
    "diksyonè kreyòl", "diksyone kreyol", "diksyonè kreyòl ayisyen",
    "definisyon mo kreyòl", "lang kreyòl", "mo kreyòl",
    // English
    "haitian creole dictionary", "creole dictionary", "kreyol dictionary",
    "haitian creole words", "learn haitian creole", "creole to creole dictionary",
    // Français
    "dictionnaire créole haïtien", "dictionnaire créole", "créole haïtien",
    "mots créoles", "apprendre le créole haïtien",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "https://diksyonekreyol.org",
    siteName: "Diksyonè Kreyòl",
    title: "Diksyonè Kreyòl — Haitian Creole Dictionary",
    description:
      "Definisyon, sinonim, etimoloji ak egzanp pou mo kreyòl ayisyen yo — tout an kreyòl, gratis.",
    locale: "ht_HT",
  },
  twitter: {
    card: "summary",
    title: "Diksyonè Kreyòl — Haitian Creole Dictionary",
    description:
      "Definisyon, sinonim, etimoloji ak egzanp pou mo kreyòl ayisyen yo.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
  },
};

// Sitelinks search box: tells Google the site has its own word search
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Diksyonè Kreyòl",
  alternateName: ["Haitian Creole Dictionary", "Dictionnaire Créole Haïtien"],
  url: "https://diksyonekreyol.org",
  inLanguage: "ht",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://diksyonekreyol.org/results?search={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ht"
      className={`${geistSans.variable} ${geistMono.variable} ${lora.variable}`}
    >
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1 flex flex-col">{children}</main>
          <Footer />
        </div>
      </body>
      {process.env.NEXT_PUBLIC_GA_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      )}
    </html>
  );
}

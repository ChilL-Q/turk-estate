import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { LanguageProvider } from '../context/LanguageContext';
import Header from '../components/Header';
import PageTransition from '../components/PageTransition';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "TurkEstate — B2B Real Estate Platform",
  description: "Premium closed-network B2B marketplace for Turkish real estate",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <LanguageProvider>
          <Header />
          <PageTransition>
            {children}
          </PageTransition>
        </LanguageProvider>
      </body>
    </html>
  );
}

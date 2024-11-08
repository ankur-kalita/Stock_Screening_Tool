import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Lexend, Pacifico } from "next/font/google";

const paci = Pacifico({
  weight: "400",
  subsets: ['latin'],
  preload: true,
});

export const metadata: Metadata = {
  title: "Stock Screener",
  description: "A web-based stock screening tool",
};

const lexend = Lexend({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={lexend.className}>{children}</body>
    </html>
  );
}

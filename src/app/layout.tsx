import type { Metadata } from "next";
import "./globals.css";
import { Lexend } from "next/font/google";

// Define the fonts
// const pacifico = Pacifico({
//   weight: "400",
//   subsets: ["latin"],
//   preload: true,
// });

const lexend = Lexend({
  subsets: ["latin"],
  display: "swap",
});

// Metadata for the page
export const metadata: Metadata = {
  title: "Stock Screener",
  description: "A web-based stock screening tool",
};

// Root layout component
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={lexend.className}>
        {children}
      </body>
    </html>
  );
}

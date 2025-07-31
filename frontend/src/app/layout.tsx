import type { Metadata } from "next";
import { Inter, Bebas_Neue, Oswald } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { QueryProvider } from "./providers/queryProvider";

// Fontes com CSS variables
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
});

const bebas_neue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: ["400"],
});
const opfont = localFont({
  src: "../../public/fonts/one-piece.ttf",
  variable: "--font-op",
  display: "swap",
});

export const metadata = {
  title: "Mugiwara Dex",
  description: "Um app compêndio de One Piece",
  icons: {
    icon: "/favicon/favicon.ico",
    apple: "/favicon/apple-icon.png",
    shortcut: "/favicon/icon0.svg", // se quiser um SVG como atalho
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${oswald.variable} ${bebas_neue.variable} ${opfont.variable} antialiased w-screen h-screen flex flex-col`}
      >
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}

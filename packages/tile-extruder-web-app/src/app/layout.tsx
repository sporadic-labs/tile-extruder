import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { TilesetImageProvider } from "@/app/extrude/form/TilesetImageProvider";
import { Header } from "@/app/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tile Extruder - Prevent Tileset Bleeding",
  description:
    "A web tool to extrude tiles in tilesets to prevent rendering artifacts in game engines.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="Tile Extruder" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={inter.className}>
        <Header />
        <TilesetImageProvider>{children}</TilesetImageProvider>
      </body>
    </html>
  );
}

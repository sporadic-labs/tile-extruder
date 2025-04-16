import { TilesetImageProvider } from "./providers";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <TilesetImageProvider>{children}</TilesetImageProvider>
      </body>
    </html>
  );
}

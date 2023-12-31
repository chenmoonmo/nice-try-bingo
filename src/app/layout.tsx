import "./globals.css";
import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import { Providers } from "./providers";

const notoSansJP = Noto_Sans_JP({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "#NiCE TRY BINGO",
  description: "NiCE TRY 都市散步 BINGO，以轻松愉快的心情面对就可以了！",
  icons: "/favicon.jpg",
  twitter: {
    card: "summary_large_image",
    title: "#NiCE TRY BINGO",
    description: "NiCE TRY 都市散步 BINGO，以轻松愉快的心情面对就可以了！",
    images: "/bingo.jpeg",
  },
  openGraph: {
    type: "website",
    title: "#NiCE TRY BINGO",
    description: "NiCE TRY 都市散步 BINGO，以轻松愉快的心情面对就可以了！",
    images: "/bingo.jpeg",
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={notoSansJP.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

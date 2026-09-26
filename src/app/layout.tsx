import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Teman Tumbuh",
  description: "Lingkungan yang tepat bisa mengubah segalanya",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={outfit.variable}>
      <body className="min-h-screen bg-[#fefefb] text-[#1e2a22]">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

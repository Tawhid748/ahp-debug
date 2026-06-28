import type { Metadata } from "next";
import { DM_Sans, Forum, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";

const geistSans = DM_Sans({
  variable: "--font-small",
  subsets: ["latin"],
});

const geistMono = Forum({
  variable: "--font-Big",
  subsets: ["latin"],
  weight: "400"
});

export const metadata: Metadata = {
  title: "Al Hussein Perfumes",
  description: "We bring the world's most prestigious fragrances directly to you, ensuring authenticity, quality, and a luxurious experience with every scent.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

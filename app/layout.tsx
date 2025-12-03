import { Toaster } from "sonner";
import "./globals.css";
import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Exo_2,
  Raleway,
  Barlow_Semi_Condensed,
  Lato,
} from "next/font/google";
import "./globals.css";
import QueryProvider from "./query-provider";
import HeaderSection from "@/components/home/HeaderSection";

const lato = Lato({
  variable: "--lato",
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "300", "400", "700"],
});

export const metadata: Metadata = {
  title: "Pick and Play Tennis",
  description: "Welcome to GSM Tennis Academy - Home of Pick And Play",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${lato.className} font-thin`}>
      <body>
        <QueryProvider>
          {children}
          <Toaster richColors position="top-center" />
        </QueryProvider>
      </body>
    </html>
  );
}

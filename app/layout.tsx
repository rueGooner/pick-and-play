import { Toaster } from "sonner";
import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Exo_2, Raleway } from "next/font/google";
import "./globals.css";
import QueryProvider from "./query-provider";
import HeaderSection from "@/components/home/HeaderSection";

const raleway = Raleway({
  variable: "--raleway",
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "300", "400", "600"],
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
    <html lang="en" className={`${raleway.className} font-light`}>
      <body>
        <QueryProvider>
          <HeaderSection />

          {children}
          <Toaster richColors position="top-center" />
        </QueryProvider>
      </body>
    </html>
  );
}

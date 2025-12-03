import { Toaster } from "sonner";
import "./globals.css";
import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import QueryProvider from "./query-provider";

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
    <html
      suppressHydrationWarning
      lang="en"
      className={`${lato.className} font-thin`}
    >
      <body>
        <QueryProvider>
          {children}
          <Toaster richColors position="top-center" />
        </QueryProvider>
      </body>
    </html>
  );
}

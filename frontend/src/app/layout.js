import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "@/styles/globals.css";
import { Providers } from "@/components/providers/Providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const display = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata = {
  title: "ArthaSarthi — AI-Powered Personal Finance",
  description:
    "Your AI-powered financial advisor. Smart analytics, goal tracking, and conversational finance assistance.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable}`}>
      <body className="font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

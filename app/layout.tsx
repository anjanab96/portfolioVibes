import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import CursorSparkles from "@/components/CursorSparkles";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const milesdane = localFont({
  src: "./fonts/Milesdane.otf",
  variable: "--font-milesdane",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Anjana Balamourougan — Product Designer",
  description:
    "NJ based senior product designer with 6+ years of experience. Passionate about building delightful solutions with a practical lens.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`overflow-x-hidden ${inter.variable} ${milesdane.variable}`}
    >
      <body className="overflow-x-hidden bg-cream text-ink antialiased">
        <CursorSparkles />
        {children}
      </body>
    </html>
  );
}

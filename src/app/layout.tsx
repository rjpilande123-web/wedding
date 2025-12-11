import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Kapakana, Mona_Sans, Stalemate, Domine, Lora } from "next/font/google";

import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
  weight: ["400", "700"], 
  subsets: ["latin"],
});

const kapakana = Kapakana({ 
  subsets: ["latin"], 
  variable: "--font-kapakana" 
});

const stalemate = Stalemate({ 
  subsets: ["latin"], 
  weight: ["400"], 
  variable: "--font-stalemate" 
});

const monaSans = Mona_Sans({ 
  subsets: ["latin"], 
  variable: "--font-mona" 
});

const domine = Domine({ 
  subsets: ["latin"], 
  weight: ["400", "700"], 
  variable: "--font-domine" 
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "You Are Invited",
  description:
    "Join us as we celebrate our special day! Tap to view wedding details and RSVP. Kindly note that attendance is limited to those on our guest list. We can't wait to celebrate with you!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${kapakana.variable} ${stalemate.variable} ${lora.variable} antialiased`}
      >
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}

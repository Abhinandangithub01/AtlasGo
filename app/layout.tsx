import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { storyblokInit, apiPlugin } from "@storyblok/react/rsc";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AtlasGo - Explore the World",
  description: "Discover amazing places with intelligent search and AI-powered trip planning",
};

storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_API_TOKEN,
  use: [apiPlugin],
  apiOptions: {
    region: "us",
  },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        {/* Storyblok Visual Editor Bridge */}
        <script
          src="https://app.storyblok.com/f/storyblok-v2-latest.js"
          type="text/javascript"
        />
      </body>
    </html>
  );
}

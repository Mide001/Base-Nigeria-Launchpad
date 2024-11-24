import "@coinbase/onchainkit/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Base Nigeria Idea Launchpad",
  description:
    "A decentralized platform where African builders, developers, entrepreneurs, and innovators collaborate to identify and solve critical technological challenges using blockchain technology.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
      </head>
      <body suppressHydrationWarning={true} className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

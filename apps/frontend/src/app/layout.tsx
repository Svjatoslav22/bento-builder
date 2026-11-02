import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://bento-builder-frontend.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: {
    default: "Bento Builder — Your portfolio, as a bento grid",
    template: "%s | Bento Builder",
  },
  description: "An interactive developer card for recruiters. Ready in minutes.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: appUrl,
    siteName: "Bento Builder",
    title: "Bento Builder — Your portfolio, as a bento grid",
    description: "An interactive developer card for recruiters. Ready in minutes.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1024,
        height: 537,
        alt: "Bento Builder — Your portfolio, as a bento grid",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bento Builder — Your portfolio, as a bento grid",
    description: "An interactive developer card for recruiters. Ready in minutes.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

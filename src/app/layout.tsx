import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
  viewportFit: 'cover',
}

export const metadata: Metadata = {
  metadataBase: new URL("https://nest-black-five.vercel.app"),
  openGraph: {
    siteName: "Nest Homes | Real Estate",
    type: "website",
    locale: "en_US",
  },
  icons: {
    icon: [
      {
        url: "/public/favicon.ico",
        type: "image/x-icon",
      },
    ],
    shortcut: [
      {
        url: "/public/favicon.ico",
        type: "image/x-icon",
      },
    ],
  },
  title: {
    default: "Nest ",
    template: "%s | Nest Homes",
  },
  description: "Find your next home",
  twitter: {
    card: "summary_large_image",
  },
  authors: [
    {
      name: "Nest Homes. Inc",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}

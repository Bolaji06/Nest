import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://nest-black-five.vercel.app'),
  title: {
    default: 'Nest ',
    template: '%s | Nest Homes'
  },
  description: "Find your next home",
  twitter: {
    card: 'summary_large_image'
  },
  authors: [{
    name: 'Bolaji Bolajoko',
  }]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} >
       <main>
        {children}
        </main> 
        <Toaster />
      </body>
    </html>
  );
}

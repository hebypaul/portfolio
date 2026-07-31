import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SmoothScrolling } from "@/components/SmoothScrolling";
import CustomCursor from "@/components/ui/CustomCursor";
import Loader from "@/components/ui/Loader";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Premium Interactive Portfolio",
  description: "An award-winning interactive portfolio showcasing modern web development, creative coding, and premium design.",
  openGraph: {
    title: "Premium Interactive Portfolio",
    description: "An award-winning interactive portfolio showcasing modern web development, creative coding, and premium design.",
    url: "https://portfolio.local",
    siteName: "Interactive Portfolio",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Premium Interactive Portfolio",
    description: "An award-winning interactive portfolio showcasing modern web development.",
    images: ["/og.png"],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="bg-background text-text-main overflow-x-hidden">
        <Loader />
        <SmoothScrolling>
          <CustomCursor />
          {children}
        </SmoothScrolling>
      </body>
    </html>
  );
}

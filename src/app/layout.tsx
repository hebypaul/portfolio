import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SmoothScrolling } from "@/components/SmoothScrolling";
import CustomCursor from "@/components/ui/CustomCursor";
import Loader from "@/components/ui/Loader";
import Navbar from "@/components/ui/Navbar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Premium Interactive Portfolio",
  description: "An award-winning interactive portfolio showcasing modern web development, creative coding, and premium design.",
  openGraph: {
    title: "Premium Interactive Portfolio",
    description: "An award-winning interactive portfolio showcasing modern web development, creative coding, and premium design.",
    url: "https://portfolio.local",
    siteName: "Interactive Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Premium Interactive Portfolio",
    description: "An award-winning interactive portfolio showcasing modern web development.",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="bg-background text-text-main">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded-md">Skip to content</a>
        <Loader />
        <SmoothScrolling>
          <Navbar />
          <CustomCursor />
          {children}
        </SmoothScrolling>
      </body>
    </html>
  );
}

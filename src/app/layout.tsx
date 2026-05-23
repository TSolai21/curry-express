import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";


const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  style: ["normal", "italic"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["700", "900"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Curry Express — Bold Indian Flavors. Express Chinese Cravings.",
  description: "Curry Express brings you authentic Indian curries and bold Indo-Chinese flavors. Order now on DoorDash for fast, premium delivery.",
  openGraph: {
    title: "Curry Express | Premium Indian & Chinese Cuisine",
    description: "Cinematic flavors. Authentic spices. Premium experience.",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${outfit.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}

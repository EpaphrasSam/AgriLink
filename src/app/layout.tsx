import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import "react-multi-carousel/lib/styles.css";
import "swiper/css/bundle";
import { Providers } from "./providers";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";

const inter = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AgriLink",
  description: "Your one stop for all your agriculture needs",
  keywords: "agriculture, farming, agrilink, online store",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} `}>
        <Toaster position="top-center" />
        <SessionProvider>
          <Providers>
            <main>{children}</main>
          </Providers>
        </SessionProvider>
      </body>
    </html>
  );
}

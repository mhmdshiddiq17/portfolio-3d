import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "mhmdshiddiq | portfolio",
  description: "Website portfolio pribadi yang menampilkan proyek-proyek, pengalaman kerja, dan keterampilan saya di bidang pengembangan web.",
  openGraph: {
    title: "mhmdshiddiq | portfolio",
    description: "Website portfolio pribadi yang menampilkan proyek-proyek, pengalaman kerja, dan keterampilan saya di bidang pengembangan web.",
    type: "website",
    
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-darker text-white overflow-x-hidden`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

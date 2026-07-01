import type { Metadata } from "next";
import { Cormorant_Garamond, Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-noto-sans-jp",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: "WMF（ヴェーエムエフ） 包丁・ナイフ - WMF公式オンラインショップ",
  description:
    "創業1853年、ドイツ生まれのキッチン用品ブランド WMF（ヴェーエムエフ）の「包丁・ナイフ」はこちらから。",
  openGraph: {
    title: "WMF（ヴェーエムエフ） 包丁・ナイフ - WMF公式オンラインショップ",
    description:
      "創業1853年、ドイツ生まれのキッチン用品ブランド WMF（ヴェーエムエフ）の「包丁・ナイフ」はこちらから。",
    url: "https://shop.wmf.co.jp/shop/goods/list.html?cid=WMF-knives-1",
    siteName: "WMF公式オンラインショップ",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${notoSansJP.variable} ${cormorant.variable}`}>
      <body className="bg-paper text-ink antialiased">{children}</body>
    </html>
  );
}

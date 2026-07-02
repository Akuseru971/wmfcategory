import type { Metadata } from "next";
import CategoryPage from "@/components/CategoryPage";
import { casseroleConfig } from "@/data/categories/casserole";

export const metadata: Metadata = {
  title: "WMF（ヴェーエムエフ） 鍋 - WMF公式オンラインショップ",
  description:
    "創業1853年、ドイツ生まれのキッチン用品ブランド WMF（ヴェーエムエフ）の「鍋」はこちらから。",
  openGraph: {
    title: "WMF（ヴェーエムエフ） 鍋 - WMF公式オンラインショップ",
    description:
      "創業1853年、ドイツ生まれのキッチン用品ブランド WMF（ヴェーエムエフ）の「鍋」はこちらから。",
    url: "https://shop.wmf.co.jp/shop/goods/list.html?cid=WMF-casserole",
    siteName: "WMF公式オンラインショップ",
    type: "website",
  },
};

export default function CasserolePage() {
  return <CategoryPage config={casseroleConfig} />;
}

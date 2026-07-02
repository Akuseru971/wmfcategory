import type { CategoryConfig } from "../types";
import { SHOP_BASE } from "../types";

export type KnifeCategoryId =
  | "santoku"
  | "chef"
  | "petty"
  | "bread"
  | "scissors"
  | "accessories";

export type SeriesId =
  | "damascus"
  | "ultimate"
  | "grandwood"
  | "grandgourmet"
  | "spitzenklasse"
  | "kineo"
  | "accessories";

export interface Series {
  id: SeriesId;
  name: string;
  nameShort: string;
  url: string;
  image: string;
}

export const SERIES: Series[] = [
  {
    id: "damascus",
    name: "ダマスティール",
    nameShort: "ダマスティール",
    url: `${SHOP_BASE}/shop/goods/list.html?cid=WMF-knives-1-2`,
    image: `${SHOP_BASE}/g_images/3201002755/3201002755_00_ptn.jpg`,
  },
  {
    id: "ultimate",
    name: "アルティメット",
    nameShort: "アルティメット",
    url: `${SHOP_BASE}/shop/goods/list.html?cid=WMF-knives-1-6`,
    image: `${SHOP_BASE}/g_images/3201112330/3201112330_00_ptn.jpg`,
  },
  {
    id: "grandwood",
    name: "グランドウッド",
    nameShort: "グランドウッド",
    url: `${SHOP_BASE}/shop/goods/list.html?cid=WMF-knives-1-5`,
    image: `${SHOP_BASE}/g_images/3201113273/3201113273_00_ptn.jpg`,
  },
  {
    id: "grandgourmet",
    name: "グランドグルメ",
    nameShort: "グランドグルメ",
    url: `${SHOP_BASE}/shop/goods/list.html?cid=WMF-knives-1-3`,
    image: `${SHOP_BASE}/g_images/3201002708/3201002708_00_ptn.jpg`,
  },
  {
    id: "spitzenklasse",
    name: "シュピッツェンクラス",
    nameShort: "シュピッツェンクラス",
    url: `${SHOP_BASE}/shop/goods/list.html?cid=WMF-knives-1-1`,
    image: `${SHOP_BASE}/g_images/3201000248/3201000248_00_ptn.jpg`,
  },
  {
    id: "kineo",
    name: "キネオ",
    nameShort: "キネオ",
    url: `${SHOP_BASE}/shop/goods/list.html?cid=WMF-knives-1-4`,
    image: `${SHOP_BASE}/g_images/3201019486/3201019486_00_ptn.jpg`,
  },
  {
    id: "accessories",
    name: "ナイフ関連商品",
    nameShort: "関連商品",
    url: `${SHOP_BASE}/shop/goods/list.html?cid=WMF-knives-2`,
    image: `${SHOP_BASE}/g_images/3201113276/3201113276_00_ptn.jpg`,
  },
];

export type SortType = "normal" | "new" | "salableness" | "price";

export interface SortOption {
  id: SortType;
  label: string;
  url: string;
}

export const SORT_OPTIONS: SortOption[] = [
  {
    id: "normal",
    label: "おすすめ順",
    url: `${SHOP_BASE}/shop/goods/list.html?cid=WMF-knives-1`,
  },
  {
    id: "new",
    label: "新着順",
    url: `${SHOP_BASE}/shop/goods/list.html?stype=new&pnum=1&asc=false&cid=WMF-knives-1&sid=&vtype=thumbs`,
  },
  {
    id: "salableness",
    label: "人気順",
    url: `${SHOP_BASE}/shop/goods/list.html?stype=salableness&pnum=1&asc=false&cid=WMF-knives-1&sid=&vtype=thumbs`,
  },
  {
    id: "price",
    label: "価格順",
    url: `${SHOP_BASE}/shop/goods/list.html?stype=price&pnum=1&asc=true&cid=WMF-knives-1&sid=&vtype=thumbs`,
  },
];

export interface KnifeCategory {
  id: KnifeCategoryId;
  name: string;
  description: string;
  image: string;
  externalUrl?: string;
}

export const KNIFE_CATEGORIES: KnifeCategory[] = [
  {
    id: "santoku",
    name: "三徳包丁",
    description: "肉・魚・野菜を一本で",
    image: `${SHOP_BASE}/g_images/3201112330/3201112330_00_ptn.jpg`,
  },
  {
    id: "chef",
    name: "シェフナイフ",
    description: "プロ仕様の万能包丁",
    image: `${SHOP_BASE}/g_images/3201112329/3201112329_00_ptn.jpg`,
  },
  {
    id: "petty",
    name: "ペティナイフ",
    description: "細かな作業に最適",
    image: `${SHOP_BASE}/g_images/3201112334/3201112334_00_ptn.jpg`,
  },
  {
    id: "bread",
    name: "パン切り包丁",
    description: "パンを美しくスライス",
    image: `${SHOP_BASE}/g_images/3201113276/3201113276_00_ptn.jpg`,
  },
  {
    id: "scissors",
    name: "キッチンばさみ",
    description: "調理をサポート",
    image: `${SHOP_BASE}/g_images/3201019486/3201019486_00_ptn.jpg`,
    externalUrl: `${SHOP_BASE}/shop/goods/list.html?cid=WMF-knives-2`,
  },
  {
    id: "accessories",
    name: "ナイフ関連商品",
    description: "メンテナンス・保管",
    image: `${SHOP_BASE}/g_images/3201113276/3201113276_00_ptn.jpg`,
    externalUrl: `${SHOP_BASE}/shop/goods/list.html?cid=WMF-knives-2`,
  },
];

export interface ComparisonColumn {
  label: string;
  title: string;
  description: string;
  iconImage: string;
  productGgcd: string;
}

export const COMPARISON_COLUMNS: ComparisonColumn[] = [
  {
    label: "EVERYDAY",
    title: "毎日の料理に",
    description: "使いやすさと価格のバランスに優れた、日常使いのナイフ。",
    iconImage: `${SHOP_BASE}/g_images/3201019490/3201019490_00_ptn.jpg`,
    productGgcd: "3201019490",
  },
  {
    label: "PRECISION",
    title: "本格的な切れ味に",
    description: "ドイツの技術が生み出す、プロフェッショナルな切れ味と佇まい。",
    iconImage: `${SHOP_BASE}/g_images/3201002755/3201002755_00_ptn.jpg`,
    productGgcd: "3201002755",
  },
];

export const RECOMMEND_GGCDS = [
  "3201112330",
  "3201002755",
  "3201112329",
  "3201113273",
  "3201000240",
  "3201019490",
];

export interface Product {
  ggcd: string;
  name: string;
  price: number;
  priceLabel: string;
  image: string;
  url: string;
  series: SeriesId;
  subCategory: KnifeCategoryId;
  badges: string[];
}

export const PRODUCTS: Product[] = [
  {
    ggcd: "3201112334",
    name: "アルティメット ユーティリティナイフ",
    price: 59400,
    priceLabel: "59,400円（税込）",
    image: `${SHOP_BASE}/g_images/3201112334/3201112334_00_ptn.jpg`,
    url: `${SHOP_BASE}/shop/goods/index.html?ggcd=3201112334&cid=WMF-knives-1`,
    series: "ultimate",
    subCategory: "petty",
    badges: ["10年保証", "WMF ギフトラッピング"],
  },
  {
    ggcd: "3201112330",
    name: "アルティメット 三徳ナイフ",
    price: 63800,
    priceLabel: "63,800円（税込）",
    image: `${SHOP_BASE}/g_images/3201112330/3201112330_00_ptn.jpg`,
    url: `${SHOP_BASE}/shop/goods/index.html?ggcd=3201112330&cid=WMF-knives-1`,
    series: "ultimate",
    subCategory: "santoku",
    badges: ["10年保証", "WMF ギフトラッピング"],
  },
  {
    ggcd: "3201112329",
    name: "アルティメット シェフナイフ",
    price: 63800,
    priceLabel: "63,800円（税込）",
    image: `${SHOP_BASE}/g_images/3201112329/3201112329_00_ptn.jpg`,
    url: `${SHOP_BASE}/shop/goods/index.html?ggcd=3201112329&cid=WMF-knives-1`,
    series: "ultimate",
    subCategory: "chef",
    badges: ["10年保証", "WMF ギフトラッピング"],
  },
  {
    ggcd: "3201113273",
    name: "グランドウッド シェフナイフ PC",
    price: 48400,
    priceLabel: "48,400円（税込）",
    image: `${SHOP_BASE}/g_images/3201113273/3201113273_00_ptn.jpg`,
    url: `${SHOP_BASE}/shop/goods/index.html?ggcd=3201113273&cid=WMF-knives-1`,
    series: "grandwood",
    subCategory: "chef",
    badges: ["WMF ギフトラッピング"],
  },
  {
    ggcd: "3201113277",
    name: "グランドウッド 三徳ナイフ PC",
    price: 48400,
    priceLabel: "48,400円（税込）",
    image: `${SHOP_BASE}/g_images/3201113277/3201113277_00_ptn.jpg`,
    url: `${SHOP_BASE}/shop/goods/index.html?ggcd=3201113277&cid=WMF-knives-1`,
    series: "grandwood",
    subCategory: "santoku",
    badges: ["WMF ギフトラッピング"],
  },
  {
    ggcd: "3201113280",
    name: "グランドウッド ユーティリティナイフ PC",
    price: 33000,
    priceLabel: "33,000円（税込）",
    image: `${SHOP_BASE}/g_images/3201113280/3201113280_00_ptn.jpg`,
    url: `${SHOP_BASE}/shop/goods/index.html?ggcd=3201113280&cid=WMF-knives-1`,
    series: "grandwood",
    subCategory: "petty",
    badges: ["WMF ギフトラッピング"],
  },
  {
    ggcd: "3201113276",
    name: "グランドウッド ブレッドナイフ PC",
    price: 27500,
    priceLabel: "27,500円（税込）",
    image: `${SHOP_BASE}/g_images/3201113276/3201113276_00_ptn.jpg`,
    url: `${SHOP_BASE}/shop/goods/index.html?ggcd=3201113276&cid=WMF-knives-1`,
    series: "grandwood",
    subCategory: "bread",
    badges: ["WMF ギフトラッピング"],
  },
  {
    ggcd: "3201000248",
    name: "シュピッツェンクラス シェフナイフ PC",
    price: 22880,
    priceLabel: "22,880円（税込）",
    image: `${SHOP_BASE}/g_images/3201000248/3201000248_00_ptn.jpg`,
    url: `${SHOP_BASE}/shop/goods/index.html?ggcd=3201000248&cid=WMF-knives-1`,
    series: "spitzenklasse",
    subCategory: "chef",
    badges: ["WMF ギフトラッピング"],
  },
  {
    ggcd: "3201000240",
    name: "シュピッツェンクラス 三徳ナイフ PC",
    price: 22880,
    priceLabel: "22,880円（税込）",
    image: `${SHOP_BASE}/g_images/3201000240/3201000240_00_ptn.jpg`,
    url: `${SHOP_BASE}/shop/goods/index.html?ggcd=3201000240&cid=WMF-knives-1`,
    series: "spitzenklasse",
    subCategory: "santoku",
    badges: ["WMF ギフトラッピング"],
  },
  {
    ggcd: "3201000252",
    name: "シュピッツェンクラス ユーティリティナイフ PC",
    price: 16500,
    priceLabel: "16,500円（税込）",
    image: `${SHOP_BASE}/g_images/3201000252/3201000252_00_ptn.jpg`,
    url: `${SHOP_BASE}/shop/goods/index.html?ggcd=3201000252&cid=WMF-knives-1`,
    series: "spitzenklasse",
    subCategory: "petty",
    badges: ["WMF ギフトラッピング"],
  },
  {
    ggcd: "3201002708",
    name: "グランドグルメ シェフナイフ PC",
    price: 31763,
    priceLabel: "31,763円（税込）",
    image: `${SHOP_BASE}/g_images/3201002708/3201002708_00_ptn.jpg`,
    url: `${SHOP_BASE}/shop/goods/index.html?ggcd=3201002708&cid=WMF-knives-1`,
    series: "grandgourmet",
    subCategory: "chef",
    badges: ["WMF ギフトラッピング"],
  },
  {
    ggcd: "3201002753",
    name: "グランドグルメ 三徳ナイフ PC",
    price: 31763,
    priceLabel: "31,763円（税込）",
    image: `${SHOP_BASE}/g_images/3201002753/3201002753_00_ptn.jpg`,
    url: `${SHOP_BASE}/shop/goods/index.html?ggcd=3201002753&cid=WMF-knives-1`,
    series: "grandgourmet",
    subCategory: "santoku",
    badges: ["WMF ギフトラッピング"],
  },
  {
    ggcd: "3201002725",
    name: "グランドグルメ ブレッドナイフ PC",
    price: 27951,
    priceLabel: "27,951円（税込）",
    image: `${SHOP_BASE}/g_images/3201002725/3201002725_00_ptn.jpg`,
    url: `${SHOP_BASE}/shop/goods/index.html?ggcd=3201002725&cid=WMF-knives-1`,
    series: "grandgourmet",
    subCategory: "bread",
    badges: ["WMF ギフトラッピング"],
  },
  {
    ggcd: "3201002755",
    name: "ダマスティール 三徳ナイフ PC",
    price: 76230,
    priceLabel: "76,230円（税込）",
    image: `${SHOP_BASE}/g_images/3201002755/3201002755_00_ptn.jpg`,
    url: `${SHOP_BASE}/shop/goods/index.html?ggcd=3201002755&cid=WMF-knives-1`,
    series: "damascus",
    subCategory: "santoku",
    badges: ["WMF ギフトラッピング"],
  },
  {
    ggcd: "3201019486",
    name: "キネオ シェフナイフPC",
    price: 9900,
    priceLabel: "9,900円（税込）",
    image: `${SHOP_BASE}/g_images/3201019486/3201019486_00_ptn.jpg`,
    url: `${SHOP_BASE}/shop/goods/index.html?ggcd=3201019486&cid=WMF-knives-1`,
    series: "kineo",
    subCategory: "chef",
    badges: ["WMF ギフトラッピング"],
  },
  {
    ggcd: "3201019490",
    name: "キネオ 三徳ナイフPC",
    price: 9900,
    priceLabel: "9,900円（税込）",
    image: `${SHOP_BASE}/g_images/3201019490/3201019490_00_ptn.jpg`,
    url: `${SHOP_BASE}/shop/goods/index.html?ggcd=3201019490&cid=WMF-knives-1`,
    series: "kineo",
    subCategory: "santoku",
    badges: ["WMF ギフトラッピング"],
  },
  {
    ggcd: "3201019492",
    name: "キネオ ブレッドナイフPC",
    price: 9900,
    priceLabel: "9,900円（税込）",
    image: `${SHOP_BASE}/g_images/3201019492/3201019492_00_ptn.jpg`,
    url: `${SHOP_BASE}/shop/goods/index.html?ggcd=3201019492&cid=WMF-knives-1`,
    series: "kineo",
    subCategory: "bread",
    badges: ["WMF ギフトラッピング"],
  },
  {
    ggcd: "3201019500",
    name: "キネオ ユーティリティナイフPC",
    price: 7700,
    priceLabel: "7,700円（税込）",
    image: `${SHOP_BASE}/g_images/3201019500/3201019500_00_ptn.jpg`,
    url: `${SHOP_BASE}/shop/goods/index.html?ggcd=3201019500&cid=WMF-knives-1`,
    series: "kineo",
    subCategory: "petty",
    badges: ["WMF ギフトラッピング"],
  },
];

export const CATEGORY = {
  id: "WMF-knives-1",
  title: "包丁・ナイフ",
  subtitle: "切れ味、耐久性、美しさを兼ね備えたWMFのプレミアムナイフ。",
  breadcrumb: [
    { label: "TOP", url: `${SHOP_BASE}/shop/index.html` },
    { label: "包丁＆ナイフ", url: `${SHOP_BASE}/shop/goods/list.html?cid=WMF-knives` },
    { label: "包丁・ナイフ", url: `${SHOP_BASE}/shop/goods/list.html?cid=WMF-knives-1` },
  ],
  totalProducts: 18,
};

export const knivesConfig: CategoryConfig = {
  id: CATEGORY.id,
  title: CATEGORY.title,
  subtitle: CATEGORY.subtitle,
  hero: {
    image: "/images/category-hero.png?v=20260702",
    label: "WMF KNIVES",
    title: "包丁・ナイフ",
    alt: "包丁・ナイフ",
  },
  breadcrumb: CATEGORY.breadcrumb,
  totalProducts: CATEGORY.totalProducts,
  series: SERIES,
  subCategories: KNIFE_CATEGORIES,
  products: PRODUCTS,
  sortOptions: SORT_OPTIONS,
  recommendGgcds: RECOMMEND_GGCDS,
  sortSeriesOrder: ["ultimate", "damascus", "grandwood", "grandgourmet", "spitzenklasse", "kineo"],
  filterableSeriesIds: ["damascus", "ultimate", "grandwood", "grandgourmet", "spitzenklasse", "kineo"],
  filterableSubCategoryIds: ["santoku", "chef", "petty", "bread"],
  subCategoryFilterLabel: "商品タイプ",
};

export function getRecommendProducts(): Product[] {
  return RECOMMEND_GGCDS.map((ggcd) => PRODUCTS.find((p) => p.ggcd === ggcd)).filter(
    (p): p is Product => p !== undefined
  );
}

export function getProductByGgcd(ggcd: string): Product | undefined {
  return PRODUCTS.find((p) => p.ggcd === ggcd);
}

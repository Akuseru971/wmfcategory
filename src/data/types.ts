export const SHOP_BASE = "https://shop.wmf.co.jp";

export type SortType = "normal" | "new" | "salableness" | "price";

export interface SortOption {
  id: SortType;
  label: string;
  url: string;
}

export interface CategorySeries {
  id: string;
  name: string;
  nameShort: string;
  url: string;
  image: string;
}

export interface CategorySubCategory {
  id: string;
  name: string;
  description: string;
  image: string;
  externalUrl?: string;
}

export interface CategoryProduct {
  ggcd: string;
  name: string;
  price: number;
  priceLabel: string;
  image: string;
  url: string;
  series: string;
  subCategory: string;
  badges: string[];
}

export interface CategoryHero {
  image: string;
  label: string;
  title: string;
  alt: string;
}

export interface CategoryBreadcrumbItem {
  label: string;
  url: string;
}

export interface CategoryConfig {
  id: string;
  title: string;
  subtitle: string;
  hero: CategoryHero;
  breadcrumb: CategoryBreadcrumbItem[];
  totalProducts: number;
  series: CategorySeries[];
  subCategories: CategorySubCategory[];
  products: CategoryProduct[];
  sortOptions: SortOption[];
  recommendGgcds: string[];
  sortSeriesOrder: string[];
  filterableSeriesIds: string[];
  filterableSubCategoryIds: string[];
  subCategoryFilterLabel: string;
}

export function getRecommendProducts(config: CategoryConfig): CategoryProduct[] {
  return config.recommendGgcds
    .map((ggcd) => config.products.find((p) => p.ggcd === ggcd))
    .filter((p): p is CategoryProduct => p !== undefined);
}

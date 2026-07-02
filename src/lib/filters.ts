import type { CategoryConfig, CategoryProduct } from "@/data/types";

export type PriceRangeId = "under15" | "15to30" | "30to50" | "over50";

export interface ProductFilters {
  series: string[];
  subCategories: string[];
  priceRanges: PriceRangeId[];
  giftWrapping: boolean;
  warranty: boolean;
}

export const EMPTY_FILTERS: ProductFilters = {
  series: [],
  subCategories: [],
  priceRanges: [],
  giftWrapping: false,
  warranty: false,
};

export const PRICE_RANGES: { id: PriceRangeId; label: string; min: number; max: number }[] = [
  { id: "under15", label: "〜¥15,000", min: 0, max: 15000 },
  { id: "15to30", label: "¥15,000〜¥30,000", min: 15000, max: 30000 },
  { id: "30to50", label: "¥30,000〜¥50,000", min: 30000, max: 50000 },
  { id: "over50", label: "¥50,000〜", min: 50000, max: Infinity },
];

export function getFilterableSeries(config: CategoryConfig) {
  return config.series.filter((s) => config.filterableSeriesIds.includes(s.id));
}

export function getFilterableSubCategories(config: CategoryConfig) {
  return config.subCategories.filter(
    (c) => config.filterableSubCategoryIds.includes(c.id) && !c.externalUrl
  );
}

export function matchesPriceRange(price: number, rangeId: PriceRangeId): boolean {
  const range = PRICE_RANGES.find((r) => r.id === rangeId);
  if (!range) return true;
  return price >= range.min && price < range.max;
}

export function filterProducts(
  products: CategoryProduct[],
  filters: ProductFilters
): CategoryProduct[] {
  return products.filter((product) => {
    if (filters.series.length > 0 && !filters.series.includes(product.series)) {
      return false;
    }
    if (filters.subCategories.length > 0 && !filters.subCategories.includes(product.subCategory)) {
      return false;
    }
    if (
      filters.priceRanges.length > 0 &&
      !filters.priceRanges.some((r) => matchesPriceRange(product.price, r))
    ) {
      return false;
    }
    if (filters.giftWrapping && !product.badges.includes("WMF ギフトラッピング")) {
      return false;
    }
    if (filters.warranty && !product.badges.includes("10年保証")) {
      return false;
    }
    return true;
  });
}

export interface ActiveFilterChip {
  id: string;
  label: string;
  group: "series" | "subCategories" | "priceRanges" | "giftWrapping" | "warranty";
  value: string;
}

export function getActiveFilterChips(
  filters: ProductFilters,
  config: CategoryConfig
): ActiveFilterChip[] {
  const chips: ActiveFilterChip[] = [];

  filters.series.forEach((id) => {
    const s = config.series.find((x) => x.id === id);
    if (s) chips.push({ id: `series-${id}`, label: s.nameShort, group: "series", value: id });
  });

  filters.subCategories.forEach((id) => {
    const t = config.subCategories.find((x) => x.id === id);
    if (t) chips.push({ id: `type-${id}`, label: t.name, group: "subCategories", value: id });
  });

  filters.priceRanges.forEach((id) => {
    const p = PRICE_RANGES.find((x) => x.id === id);
    if (p) chips.push({ id: `price-${id}`, label: p.label, group: "priceRanges", value: id });
  });

  if (filters.giftWrapping) {
    chips.push({ id: "gift", label: "ギフトラッピング", group: "giftWrapping", value: "true" });
  }
  if (filters.warranty) {
    chips.push({ id: "warranty", label: "10年保証", group: "warranty", value: "true" });
  }

  return chips;
}

export function removeFilterChip(filters: ProductFilters, chip: ActiveFilterChip): ProductFilters {
  const next = { ...filters };
  switch (chip.group) {
    case "series":
      next.series = next.series.filter((v) => v !== chip.value);
      break;
    case "subCategories":
      next.subCategories = next.subCategories.filter((v) => v !== chip.value);
      break;
    case "priceRanges":
      next.priceRanges = next.priceRanges.filter((v) => v !== chip.value);
      break;
    case "giftWrapping":
      next.giftWrapping = false;
      break;
    case "warranty":
      next.warranty = false;
      break;
  }
  return next;
}

export function hasActiveFilters(filters: ProductFilters): boolean {
  return (
    filters.series.length > 0 ||
    filters.subCategories.length > 0 ||
    filters.priceRanges.length > 0 ||
    filters.giftWrapping ||
    filters.warranty
  );
}

export function toggleArrayItem<T>(arr: T[], item: T): T[] {
  return arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item];
}

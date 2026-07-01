"use client";

import { useMemo } from "react";
import ProductCard from "./ProductCard";
import CatalogBar from "./CatalogBar";
import SeriesFilter from "./SeriesFilter";
import {
  PRODUCTS,
  CATEGORY,
  type SeriesId,
  type SortType,
} from "@/data/products";

interface ProductGridProps {
  activeSeries: SeriesId | "all";
  onSeriesChange: (series: SeriesId | "all") => void;
  sortType: SortType;
  onSortChange: (sort: SortType) => void;
  onFilterOpen: () => void;
}

function sortProducts(products: typeof PRODUCTS, sortType: SortType) {
  const sorted = [...products];
  switch (sortType) {
    case "price":
      return sorted.sort((a, b) => a.price - b.price);
    case "new":
      return sorted.reverse();
    case "salableness":
      return sorted.sort((a, b) => {
        const order = ["ultimate", "damascus", "grandwood", "grandgourmet", "spitzenklasse", "kineo"];
        const ai = order.indexOf(a.series);
        const bi = order.indexOf(b.series);
        if (ai !== bi) return ai - bi;
        return b.price - a.price;
      });
    default:
      return sorted;
  }
}

export default function ProductGrid({
  activeSeries,
  onSeriesChange,
  sortType,
  onSortChange,
  onFilterOpen,
}: ProductGridProps) {
  const filtered = useMemo(() => {
    const base =
      activeSeries === "all"
        ? PRODUCTS
        : PRODUCTS.filter((p) => p.series === activeSeries);
    return sortProducts(base, sortType);
  }, [activeSeries, sortType]);

  return (
    <>
      <SeriesFilter activeSeries={activeSeries} onSeriesChange={onSeriesChange} />

      <section id="products" className="pb-16 md:pb-24">
        <CatalogBar
          totalCount={filtered.length}
          sortType={sortType}
          onSortChange={onSortChange}
          onFilterOpen={onFilterOpen}
        />

        <div className="mx-auto mt-8 grid max-w-[1280px] grid-cols-2 gap-x-4 gap-y-8 px-4 md:grid-cols-3 md:gap-x-6 md:gap-y-10 md:px-8 lg:grid-cols-4">
          {filtered.map((product, i) => (
            <ProductCard key={product.ggcd} product={product} index={sortType === "salableness" ? i : undefined} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mx-auto mt-12 max-w-[1280px] px-4 text-center text-[14px] text-graphite md:px-8">
            該当する商品がありません。
          </p>
        )}

        <div className="mx-auto mt-12 flex max-w-[1280px] justify-center px-4 md:px-8">
          <nav aria-label="ページネーション">
            <span className="flex h-10 w-10 items-center justify-center border border-ink bg-ink text-[13px] font-medium text-paper">
              1
            </span>
          </nav>
        </div>

        <p className="mx-auto mt-4 max-w-[1280px] px-4 text-center text-[11px] text-silver md:px-8">
          全{CATEGORY.totalProducts}商品 · ページ 1
        </p>
      </section>
    </>
  );
}

"use client";

import { useMemo } from "react";
import ProductCard from "./ProductCard";
import CatalogBar from "./CatalogBar";
import type { CategoryConfig, CategoryProduct, SortType } from "@/data/types";
import {
  filterProducts,
  getActiveFilterChips,
  removeFilterChip,
  type ProductFilters,
  type ActiveFilterChip,
} from "@/lib/filters";

interface ProductGridProps {
  config: CategoryConfig;
  filters: ProductFilters;
  onFiltersChange: (filters: ProductFilters) => void;
  sortType: SortType;
  onSortChange: (sort: SortType) => void;
  onFilterOpen: () => void;
  onSortOpen: () => void;
}

function sortProducts(
  products: CategoryProduct[],
  sortType: SortType,
  sortSeriesOrder: string[]
) {
  const sorted = [...products];
  switch (sortType) {
    case "price":
      return sorted.sort((a, b) => a.price - b.price);
    case "new":
      return sorted.reverse();
    case "salableness":
      return sorted.sort((a, b) => {
        const ai = sortSeriesOrder.indexOf(a.series);
        const bi = sortSeriesOrder.indexOf(b.series);
        if (ai !== bi) return ai - bi;
        return b.price - a.price;
      });
    default:
      return sorted;
  }
}

export default function ProductGrid({
  config,
  filters,
  onFiltersChange,
  sortType,
  onSortChange,
  onFilterOpen,
  onSortOpen,
}: ProductGridProps) {
  const activeChips = useMemo(
    () => getActiveFilterChips(filters, config),
    [filters, config]
  );

  const filtered = useMemo(() => {
    const base = filterProducts(config.products, filters);
    return sortProducts(base, sortType, config.sortSeriesOrder);
  }, [config, filters, sortType]);

  const handleRemoveChip = (chip: ActiveFilterChip) => {
    onFiltersChange(removeFilterChip(filters, chip));
  };

  const handleClearAll = () => {
    onFiltersChange({
      series: [],
      subCategories: [],
      productTypes: [],
      priceRanges: [],
      giftWrapping: false,
      warranty: false,
    });
  };

  return (
    <section id="products" aria-label="商品一覧" className="pb-16 md:pb-24">
      <CatalogBar
        totalCount={filtered.length}
        totalCatalog={config.totalProducts}
        sortType={sortType}
        sortOptions={config.sortOptions}
        onSortChange={onSortChange}
        onFilterOpen={onFilterOpen}
        onSortOpen={onSortOpen}
        activeChips={activeChips}
        onRemoveChip={handleRemoveChip}
        onClearAll={handleClearAll}
      />

      <div className="product-grid-shell mt-8">
        <div className="product-grid">
          {filtered.map((product, i) => (
            <ProductCard
              key={product.ggcd}
              product={product}
              index={sortType === "salableness" ? i : undefined}
            />
          ))}
        </div>
      </div>

      {filtered.length === 0 && (
        <p className="mx-auto mt-12 max-w-[1280px] px-4 text-center text-[14px] text-graphite md:px-8">
          該当する商品がありません。フィルターを変更してください。
        </p>
      )}

      <div className="mx-auto mt-12 flex max-w-[1280px] justify-center px-4 md:px-8">
        <nav aria-label="ページネーション">
          <span className="flex h-10 w-10 items-center justify-center border border-ink bg-ink text-[13px] font-medium text-paper">
            1
          </span>
        </nav>
      </div>
    </section>
  );
}

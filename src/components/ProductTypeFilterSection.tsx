"use client";

import { useMemo } from "react";
import type { CategoryConfig } from "@/data/types";
import { toggleArrayItem, type ProductFilters } from "@/lib/filters";

interface ProductTypeFilterSectionProps {
  config: CategoryConfig;
  filters: ProductFilters;
  onFiltersChange: (filters: ProductFilters) => void;
}

export default function ProductTypeFilterSection({
  config,
  filters,
  onFiltersChange,
}: ProductTypeFilterSectionProps) {
  const productTypes = config.productTypes ?? [];

  const countsByType = useMemo(() => {
    const counts = new Map<string, number>();
    config.products.forEach((product) => {
      if (!product.productType) return;
      counts.set(product.productType, (counts.get(product.productType) ?? 0) + 1);
    });
    return counts;
  }, [config.products]);

  const availableTypes = productTypes.filter((type) => (countsByType.get(type.id) ?? 0) > 0);

  if (availableTypes.length === 0) return null;

  const handleToggle = (typeId: string) => {
    onFiltersChange({
      ...filters,
      productTypes: toggleArrayItem(filters.productTypes, typeId),
    });
  };

  const handleClear = () => {
    onFiltersChange({ ...filters, productTypes: [] });
  };

  const hasFilter = filters.productTypes.length > 0;

  return (
    <section aria-label="商品タイプフィルター" className="border-b border-mist/60 bg-paper">
      <div className="mx-auto max-w-[1280px] px-4 py-3 md:px-8">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[10px] font-medium tracking-wide text-silver md:text-[11px]">商品タイプ</p>
          {hasFilter && (
            <button
              type="button"
              onClick={handleClear}
              className="press shrink-0 text-[10px] font-medium text-graphite transition-colors hover:text-ink"
            >
              クリア
            </button>
          )}
        </div>

        <div className="mt-2 flex flex-wrap gap-1.5">
          {availableTypes.map((type) => {
            const active = filters.productTypes.includes(type.id);
            const count = countsByType.get(type.id) ?? 0;

            return (
              <button
                key={type.id}
                type="button"
                onClick={() => handleToggle(type.id)}
                aria-pressed={active}
                className={`product-type-chip press ${active ? "is-active" : ""}`}
              >
                <span>{type.label}</span>
                <span className="product-type-chip__count">{count}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

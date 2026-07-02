"use client";

import { useState } from "react";
import type { CategoryConfig } from "@/data/types";
import {
  getFilterableSeries,
  getFilterableSubCategories,
  PRICE_RANGES,
  type ProductFilters,
  toggleArrayItem,
  type PriceRangeId,
} from "@/lib/filters";

interface FilterPanelProps {
  config: CategoryConfig;
  filters: ProductFilters;
  onChange: (filters: ProductFilters) => void;
  previewCount: number;
}

function AccordionSection({
  title,
  subtitle,
  defaultOpen = true,
  children,
}: {
  title: string;
  subtitle?: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-mist">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="press flex w-full items-center justify-between py-4 text-left"
      >
        <div>
          <p className="text-[13px] font-medium text-ink">{title}</p>
          {subtitle && <p className="mt-0.5 text-[11px] text-silver">{subtitle}</p>}
        </div>
        <svg
          className={`h-4 w-4 shrink-0 text-graphite transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          viewBox="0 0 24 24"
          fill="none"
        >
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </button>
      <div
        className={`grid transition-all duration-300 ease-out ${open ? "grid-rows-[1fr] pb-4 opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="overflow-hidden">{children}</div>
      </div>
    </div>
  );
}

function FilterPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`filter-pill press rounded-full border px-3.5 py-2 text-[12px] transition-all ${
        active
          ? "border-ink bg-ink text-paper"
          : "border-mist bg-paper text-graphite hover:border-silver hover:text-ink"
      }`}
    >
      {label}
    </button>
  );
}

function CheckboxRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="filter-checkbox press flex cursor-pointer items-center gap-3 rounded-lg px-1 py-2.5">
      <span
        className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded border transition-colors ${
          checked ? "border-ink bg-ink" : "border-mist bg-paper"
        }`}
      >
        {checked && (
          <svg className="h-3 w-3 text-paper" viewBox="0 0 12 12" fill="none">
            <path d="M2.5 6l2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="text-[13px] text-ink">{label}</span>
    </label>
  );
}

export default function FilterPanel({ config, filters, onChange, previewCount }: FilterPanelProps) {
  const set = (patch: Partial<ProductFilters>) => onChange({ ...filters, ...patch });
  const filterableSeries = getFilterableSeries(config);
  const filterableSubCategories = getFilterableSubCategories(config);

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto px-5 md:px-6">
        <p className="label-track pt-1 text-[10px] font-medium text-metal">絞り込み</p>
        <p className="mt-1 text-[11px] text-silver">
          <span className="font-medium text-ink">{previewCount}</span>件の商品
        </p>

        <div className="mt-4">
          <AccordionSection title="シリーズ" subtitle="Series">
            <div className="flex flex-wrap gap-2">
              {filterableSeries.map((series) => (
                <FilterPill
                  key={series.id}
                  label={series.nameShort}
                  active={filters.series.includes(series.id)}
                  onClick={() =>
                    set({
                      series: toggleArrayItem(filters.series, series.id),
                    })
                  }
                />
              ))}
            </div>
          </AccordionSection>

          <AccordionSection title={config.subCategoryFilterLabel} subtitle="Product type">
            <div className="flex flex-wrap gap-2">
              {filterableSubCategories.map((type) => (
                <FilterPill
                  key={type.id}
                  label={type.name}
                  active={filters.subCategories.includes(type.id)}
                  onClick={() =>
                    set({
                      subCategories: toggleArrayItem(filters.subCategories, type.id),
                    })
                  }
                />
              ))}
            </div>
          </AccordionSection>

          <AccordionSection title="価格" subtitle="Price">
            <div className="flex flex-wrap gap-2">
              {PRICE_RANGES.map((range) => (
                <FilterPill
                  key={range.id}
                  label={range.label}
                  active={filters.priceRanges.includes(range.id)}
                  onClick={() =>
                    set({
                      priceRanges: toggleArrayItem(filters.priceRanges, range.id as PriceRangeId),
                    })
                  }
                />
              ))}
            </div>
          </AccordionSection>

          <AccordionSection title="サービス" subtitle="Gift & Warranty" defaultOpen={false}>
            <div className="space-y-1">
              <CheckboxRow
                label="ギフトラッピング対応"
                checked={filters.giftWrapping}
                onChange={(v) => set({ giftWrapping: v })}
              />
              <CheckboxRow
                label="10年保証"
                checked={filters.warranty}
                onChange={(v) => set({ warranty: v })}
              />
            </div>
          </AccordionSection>
        </div>
      </div>
    </div>
  );
}

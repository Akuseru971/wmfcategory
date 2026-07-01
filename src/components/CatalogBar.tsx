"use client";

import { SORT_OPTIONS, type SortType } from "@/data/products";

interface CatalogBarProps {
  totalCount: number;
  sortType: SortType;
  onSortChange: (sort: SortType) => void;
  onFilterOpen: () => void;
}

export default function CatalogBar({
  totalCount,
  sortType,
  onSortChange,
  onFilterOpen,
}: CatalogBarProps) {
  const currentSort = SORT_OPTIONS.find((s) => s.id === sortType);

  return (
    <div className="mx-auto max-w-[1280px] px-4 md:px-8">
      <div className="flex items-center justify-between border-y border-mist py-4">
        <p className="text-[13px] font-medium text-ink">
          全<span className="mx-0.5">{totalCount}</span>商品
        </p>

        <div className="flex items-center gap-3">
          <button
            onClick={onFilterOpen}
            className="press flex h-9 items-center gap-1.5 border border-mist px-3 text-[12px] text-graphite md:hidden"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 6h16M7 12h10M10 18h4"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
            絞り込み
          </button>

          <div className="relative">
            <label htmlFor="sort-select" className="sr-only">
              並び順
            </label>
            <select
              id="sort-select"
              value={sortType}
              onChange={(e) => onSortChange(e.target.value as SortType)}
              className="h-9 appearance-none border border-mist bg-paper pl-3 pr-8 text-[12px] text-ink outline-none transition-colors focus:border-ink"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
            <svg
              className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-graphite"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </div>

          {currentSort && (
            <a
              href={currentSort.url}
              className="hidden text-[11px] text-silver underline-offset-2 transition-colors hover:text-ink hover:underline md:inline"
            >
              公式サイトで並び替え
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

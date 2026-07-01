"use client";

import { KNIFE_CATEGORIES, SERIES, type KnifeCategoryId, type SeriesId } from "@/data/products";
import type { LineTab } from "@/components/ProductLineSection";

interface FilterDrawerProps {
  open: boolean;
  onClose: () => void;
  activeTab: LineTab;
  onTabChange: (tab: LineTab) => void;
  activeCategory: KnifeCategoryId | "all";
  activeSeries: SeriesId | "all";
  onCategorySelect: (id: KnifeCategoryId) => void;
  onSeriesSelect: (id: SeriesId) => void;
  onClear: () => void;
}

export default function FilterDrawer({
  open,
  onClose,
  activeTab,
  onTabChange,
  activeCategory,
  activeSeries,
  onCategorySelect,
  onSeriesSelect,
  onClear,
}: FilterDrawerProps) {
  if (!open) return null;

  const selectAndClose = (fn: () => void) => {
    fn();
    onClose();
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="fixed inset-0 z-[70] md:hidden">
      <div className="drawer-backdrop absolute inset-0" onClick={onClose} />
      <div className={`drawer-panel open absolute bottom-0 left-0 right-0 max-h-[80vh] bg-paper`}>
        <div className="flex items-center justify-between border-b border-mist px-4 py-4">
          <h2 className="text-[14px] font-medium text-ink">絞り込み</h2>
          <button
            onClick={onClose}
            className="press flex h-9 w-9 items-center justify-center text-ink"
            aria-label="閉じる"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-1 border-b border-mist p-3">
          {(["category", "series"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={`press rounded-md py-2.5 text-[12px] font-medium ${
                activeTab === tab ? "bg-ink text-paper" : "bg-cloud text-graphite"
              }`}
            >
              {tab === "category" ? "Category" : "Series"}
            </button>
          ))}
        </div>

        <div className="overflow-y-auto p-4">
          <button
            onClick={() => selectAndClose(onClear)}
            className={`mb-3 w-full border px-4 py-3 text-left text-[13px] ${
              activeCategory === "all" && activeSeries === "all"
                ? "border-ink bg-cloud font-medium"
                : "border-mist"
            }`}
          >
            すべて
          </button>

          {activeTab === "category"
            ? KNIFE_CATEGORIES.map((cat) =>
                cat.externalUrl ? (
                  <a
                    key={cat.id}
                    href={cat.externalUrl}
                    className="mb-2 block w-full border border-mist px-4 py-3 text-[13px]"
                    onClick={onClose}
                  >
                    {cat.name}
                  </a>
                ) : (
                  <button
                    key={cat.id}
                    onClick={() => selectAndClose(() => onCategorySelect(cat.id))}
                    className={`mb-2 w-full border px-4 py-3 text-left text-[13px] ${
                      activeCategory === cat.id ? "border-ink bg-cloud font-medium" : "border-mist"
                    }`}
                  >
                    {cat.name}
                  </button>
                )
              )
            : SERIES.map((series) =>
                series.id === "accessories" ? (
                  <a
                    key={series.id}
                    href={series.url}
                    className="mb-2 block w-full border border-mist px-4 py-3 text-[13px]"
                    onClick={onClose}
                  >
                    {series.name}
                  </a>
                ) : (
                  <button
                    key={series.id}
                    onClick={() => selectAndClose(() => onSeriesSelect(series.id))}
                    className={`mb-2 w-full border px-4 py-3 text-left text-[13px] ${
                      activeSeries === series.id ? "border-ink bg-cloud font-medium" : "border-mist"
                    }`}
                  >
                    {series.name}
                  </button>
                )
              )}
        </div>
      </div>
    </div>
  );
}

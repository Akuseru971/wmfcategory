"use client";

import { SERIES, type SeriesId } from "@/data/products";

interface FilterDrawerProps {
  open: boolean;
  onClose: () => void;
  activeSeries: SeriesId | "all";
  onSeriesChange: (series: SeriesId | "all") => void;
}

export default function FilterDrawer({
  open,
  onClose,
  activeSeries,
  onSeriesChange,
}: FilterDrawerProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] md:hidden">
      <div className="drawer-backdrop absolute inset-0" onClick={onClose} />
      <div className={`drawer-panel absolute bottom-0 left-0 right-0 max-h-[70vh] bg-paper ${open ? "open" : ""}`}>
        <div className="flex items-center justify-between border-b border-mist px-4 py-4">
          <h2 className="text-[14px] font-medium text-ink">シリーズで絞り込む</h2>
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
        <div className="overflow-y-auto p-4">
          <button
            onClick={() => {
              onSeriesChange("all");
              onClose();
            }}
            className={`mb-2 w-full border px-4 py-3 text-left text-[13px] ${
              activeSeries === "all" ? "border-ink bg-cloud font-medium" : "border-mist"
            }`}
          >
            すべて
          </button>
          {SERIES.map((series) => (
            <button
              key={series.id}
              onClick={() => {
                onSeriesChange(series.id);
                onClose();
              }}
              className={`mb-2 w-full border px-4 py-3 text-left text-[13px] ${
                activeSeries === series.id ? "border-ink bg-cloud font-medium" : "border-mist"
              }`}
            >
              {series.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

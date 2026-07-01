"use client";

import Image from "next/image";
import { SERIES, type SeriesId } from "@/data/products";

interface SeriesFilterProps {
  activeSeries: SeriesId | "all";
  onSeriesChange: (series: SeriesId | "all") => void;
}

export default function SeriesFilter({ activeSeries, onSeriesChange }: SeriesFilterProps) {
  return (
    <section id="series" className="mx-auto max-w-[1280px] px-4 py-10 md:px-8 md:py-14">
      <p className="label-track text-[10px] font-medium text-metal md:text-[11px]">CATEGORY</p>
      <h2 className="mt-1.5 text-[19px] font-medium text-ink md:text-[24px]">シリーズから探す</h2>

      <div className="mt-6 -mx-4 overflow-x-auto px-4 scrollbar-hide md:mx-0 md:px-0">
        <div className="flex gap-3 md:grid md:grid-cols-4 md:gap-4 lg:grid-cols-7">
          <button
            onClick={() => onSeriesChange("all")}
            className={`series-pill press flex w-[140px] shrink-0 flex-col items-center rounded-sm p-3 md:w-auto ${
              activeSeries === "all" ? "active" : ""
            }`}
          >
            <div className="flex h-16 w-full items-center justify-center bg-cloud">
              <span className="text-[11px] font-medium text-graphite">ALL</span>
            </div>
            <span className="mt-2.5 text-center text-[11.5px] font-medium text-ink">すべて</span>
          </button>

          {SERIES.map((series) => (
            <button
              key={series.id}
              onClick={() => onSeriesChange(series.id)}
              className={`series-pill press flex w-[140px] shrink-0 flex-col items-center rounded-sm p-3 md:w-auto ${
                activeSeries === series.id ? "active" : ""
              }`}
            >
              <div className="relative h-16 w-full overflow-hidden bg-cloud">
                <Image
                  src={series.image}
                  alt={series.name}
                  fill
                  className="object-contain p-2"
                  sizes="140px"
                  loading="lazy"
                />
              </div>
              <span className="mt-2.5 text-center text-[11.5px] font-medium leading-snug text-ink">
                {series.nameShort}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 hidden gap-2 md:flex md:flex-wrap">
        {SERIES.map((series) => (
          <a
            key={series.id}
            href={series.url}
            className="text-[11px] text-silver underline-offset-2 transition-colors hover:text-ink hover:underline"
          >
            {series.name} →
          </a>
        ))}
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { useMemo } from "react";
import type { CategoryConfig } from "@/data/types";
import { toggleArrayItem, type ProductFilters } from "@/lib/filters";

interface SeriesFilterSectionProps {
  config: CategoryConfig;
  filters: ProductFilters;
  onFiltersChange: (filters: ProductFilters) => void;
}

function IconArrow() {
  return (
    <svg className="h-2.5 w-2.5 shrink-0" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconCheck() {
  return (
    <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3.5 8.5l3 3 6-6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconAllSeries() {
  return (
    <svg className="h-4 w-4 text-graphite" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="4" width="6.5" height="6.5" rx="1" stroke="currentColor" strokeWidth="1.4" />
      <rect x="13.5" y="4" width="6.5" height="6.5" rx="1" stroke="currentColor" strokeWidth="1.4" />
      <rect x="4" y="13.5" width="6.5" height="6.5" rx="1" stroke="currentColor" strokeWidth="1.4" />
      <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function SeriesFilterCard({
  label,
  image,
  alt,
  active,
  count,
  onClick,
  allCard = false,
}: {
  label: string;
  image?: string;
  alt: string;
  active?: boolean;
  count?: number;
  onClick?: () => void;
  allCard?: boolean;
}) {
  const className = `series-filter-card press group/card relative flex h-[58px] w-full flex-row items-stretch overflow-hidden text-left md:h-[64px] ${
    active ? "is-active" : ""
  }`;

  const content = (
    <>
      <div className="series-filter-card__media relative flex w-[52px] shrink-0 items-center justify-center bg-cloud md:w-[56px]">
        {allCard ? (
          active ? (
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ink text-paper">
              <IconCheck />
            </span>
          ) : (
            <IconAllSeries />
          )
        ) : image ? (
          <Image
            src={image}
            alt={alt}
            fill
            className="object-contain p-1 transition-transform duration-500 ease-out group-hover/card:scale-[1.06] md:p-1.5"
            sizes="56px"
            loading="lazy"
          />
        ) : null}
      </div>

      <div className="flex min-w-0 flex-1 items-center justify-between gap-1.5 px-2.5 md:gap-2 md:px-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-[11px] font-medium leading-tight text-ink md:text-[12px]">{label}</p>
          {count !== undefined && (
            <p className="mt-0.5 text-[9px] text-silver md:text-[10px]">{count}件</p>
          )}
          {allCard && active && (
            <p className="mt-0.5 text-[9px] font-medium text-ink md:text-[10px]">選択中</p>
          )}
        </div>
        {!allCard && (
          <span className="series-filter-card__arrow hidden h-5 w-5 shrink-0 items-center justify-center rounded-full border border-mist text-graphite transition-all duration-300 group-hover/card:border-ink group-hover/card:text-ink sm:flex">
            <IconArrow />
          </span>
        )}
      </div>

      {!allCard && active && (
        <span className="series-filter-card__badge absolute right-1.5 top-1.5 px-1 py-px text-[7px] font-medium tracking-wide md:text-[8px]">
          選択中
        </span>
      )}
    </>
  );

  return (
    <button type="button" onClick={onClick} className={className} aria-pressed={active} aria-label={label}>
      {content}
    </button>
  );
}

export default function SeriesFilterSection({
  config,
  filters,
  onFiltersChange,
}: SeriesFilterSectionProps) {
  const visualSeries = config.series;

  const countsBySeries = useMemo(() => {
    const counts = new Map<string, number>();
    config.products.forEach((product) => {
      counts.set(product.series, (counts.get(product.series) ?? 0) + 1);
    });
    return counts;
  }, [config.products]);

  const hasSeriesFilter = filters.series.length > 0;

  const handleToggle = (seriesId: string) => {
    onFiltersChange({
      ...filters,
      series: toggleArrayItem(filters.series, seriesId),
    });
  };

  const handleClearSeries = () => {
    onFiltersChange({ ...filters, series: [] });
  };

  return (
    <section id="series-filters" aria-label="シリーズフィルター" className="border-b border-mist/80 bg-paper">
      <div className="mx-auto max-w-[1280px] px-4 py-4 md:px-8 md:py-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="label-track text-[9px] font-medium text-metal">FILTER</p>
            <h2 className="mt-1 text-[17px] font-medium leading-tight text-ink md:text-[19px]">
              シリーズから探す
            </h2>
            <p className="mt-0.5 text-[10px] text-silver md:text-[11px]">お好みのシリーズで絞り込む</p>
          </div>

          {hasSeriesFilter && (
            <button
              type="button"
              onClick={handleClearSeries}
              className="press shrink-0 border border-mist px-2.5 py-1 text-[10px] font-medium tracking-wide text-graphite transition-colors hover:border-ink hover:text-ink"
            >
              クリア
            </button>
          )}
        </div>

        <div className="series-filter-rail mt-3 grid grid-cols-2 gap-2 md:mt-3.5 md:grid-cols-3">
          <SeriesFilterCard
            allCard
            label="すべて"
            alt="すべてのシリーズ"
            active={!hasSeriesFilter}
            onClick={handleClearSeries}
          />

          {visualSeries.map((series) => {
            const count = countsBySeries.get(series.id) ?? 0;

            return (
              <SeriesFilterCard
                key={series.id}
                label={series.name}
                image={series.image}
                alt={series.name}
                active={filters.series.includes(series.id)}
                count={count > 0 ? count : undefined}
                onClick={() => handleToggle(series.id)}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

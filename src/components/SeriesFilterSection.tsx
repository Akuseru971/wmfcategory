"use client";

import Image from "next/image";
import { useMemo } from "react";
import { SERIES, PRODUCTS, type SeriesId } from "@/data/products";
import { toggleArrayItem, type ProductFilters } from "@/lib/filters";

interface SeriesFilterSectionProps {
  filters: ProductFilters;
  onFiltersChange: (filters: ProductFilters) => void;
}

const VISUAL_SERIES = SERIES;

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

function SeriesFilterCard({
  label,
  image,
  alt,
  active,
  count,
  external,
  href,
  onClick,
}: {
  label: string;
  image?: string;
  alt: string;
  active?: boolean;
  count?: number;
  external?: boolean;
  href?: string;
  onClick?: () => void;
}) {
  const className = `series-filter-card press group/card relative flex h-[58px] w-full flex-row items-stretch overflow-hidden text-left md:h-[64px] ${
    active ? "is-active" : ""
  }`;

  const content = (
    <>
      <div className="series-filter-card__media relative w-[52px] shrink-0 bg-cloud md:w-[56px]">
        {image ? (
          <Image
            src={image}
            alt={alt}
            fill
            className="object-contain p-1 transition-transform duration-500 ease-out group-hover/card:scale-[1.06] md:p-1.5"
            sizes="56px"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full items-center justify-center px-1">
            <span className="text-[11px] font-medium tracking-wide text-graphite">すべて</span>
          </div>
        )}
      </div>

      <div className="flex min-w-0 flex-1 items-center justify-between gap-1.5 px-2.5 md:gap-2 md:px-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-[11px] font-medium leading-tight text-ink md:text-[12px]">{label}</p>
          {count !== undefined && (
            <p className="mt-0.5 text-[9px] text-silver md:text-[10px]">{count}件</p>
          )}
        </div>
        <span className="series-filter-card__arrow hidden h-5 w-5 shrink-0 items-center justify-center rounded-full border border-mist text-graphite transition-all duration-300 group-hover/card:border-ink group-hover/card:text-ink sm:flex">
          <IconArrow />
        </span>
      </div>

      {active && (
        <span className="series-filter-card__badge absolute right-1.5 top-1.5 px-1 py-px text-[7px] font-medium tracking-wide md:text-[8px]">
          選択中
        </span>
      )}
    </>
  );

  if (external && href) {
    return (
      <a href={href} className={className} aria-label={label}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={className} aria-pressed={active} aria-label={label}>
      {content}
    </button>
  );
}

export default function SeriesFilterSection({ filters, onFiltersChange }: SeriesFilterSectionProps) {
  const countsBySeries = useMemo(() => {
    const counts = new Map<SeriesId, number>();
    PRODUCTS.forEach((product) => {
      counts.set(product.series, (counts.get(product.series) ?? 0) + 1);
    });
    return counts;
  }, []);

  const hasSeriesFilter = filters.series.length > 0;

  const handleToggle = (seriesId: SeriesId) => {
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

        {/* Single filter rail — carousel on mobile, 4-col grid on desktop */}
        <div className="series-filter-rail -mx-4 mt-3 flex snap-x snap-mandatory gap-2 overflow-x-auto px-4 pb-0.5 scrollbar-hide md:mx-0 md:mt-3.5 md:grid md:grid-cols-4 md:gap-2 md:overflow-visible md:px-0 md:snap-none">
          <div className="w-[52vw] min-w-[156px] max-w-[190px] shrink-0 snap-start md:w-auto md:min-w-0 md:max-w-none">
            <SeriesFilterCard
              label="すべて"
              alt="すべてのシリーズ"
              active={!hasSeriesFilter}
              onClick={handleClearSeries}
            />
          </div>

          {VISUAL_SERIES.map((series) => {
            const count = countsBySeries.get(series.id) ?? 0;
            const isExternal = series.id === "accessories" && count === 0;

            return (
              <div
                key={series.id}
                className="w-[52vw] min-w-[156px] max-w-[190px] shrink-0 snap-start md:w-auto md:min-w-0 md:max-w-none"
              >
                <SeriesFilterCard
                  label={series.name}
                  image={series.image}
                  alt={series.name}
                  active={filters.series.includes(series.id)}
                  count={count > 0 ? count : undefined}
                  external={isExternal}
                  href={isExternal ? series.url : undefined}
                  onClick={isExternal ? undefined : () => handleToggle(series.id)}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

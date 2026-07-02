"use client";

import Image from "next/image";
import { useMemo } from "react";
import { SERIES, PRODUCTS, type SeriesId } from "@/data/products";
import { toggleArrayItem, type ProductFilters } from "@/lib/filters";
import { useReveal } from "@/hooks/useReveal";

interface SeriesFilterSectionProps {
  filters: ProductFilters;
  onFiltersChange: (filters: ProductFilters) => void;
}

const VISUAL_SERIES = SERIES;

function IconArrow() {
  return (
    <svg className="h-3 w-3 shrink-0" viewBox="0 0 16 16" fill="none" aria-hidden="true">
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
  const className = `series-filter-card press group/card flex h-[72px] w-full flex-row items-stretch overflow-hidden text-left md:h-[80px] ${
    active ? "is-active" : ""
  }`;

  const content = (
    <>
      <div className="series-filter-card__media relative w-[60px] shrink-0 bg-cloud md:w-[68px]">
        {image ? (
          <Image
            src={image}
            alt={alt}
            fill
            className="series-filter-card__image object-contain p-1.5 transition-transform duration-500 ease-out group-hover/card:scale-[1.05] md:p-2"
            sizes="68px"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-0.5 px-1">
            <span className="font-[family-name:var(--font-editorial)] text-[15px] font-medium leading-none text-ink/80 md:text-[16px]">
              All
            </span>
            <span className="text-[9px] tracking-wide text-graphite">すべて</span>
          </div>
        )}
      </div>

      <div className="flex min-w-0 flex-1 items-center justify-between gap-2 px-3 md:px-3.5">
        <div className="min-w-0 flex-1">
          <p className="truncate text-[12px] font-medium leading-snug text-ink md:text-[13px]">{label}</p>
          {count !== undefined && (
            <p className="mt-0.5 text-[10px] text-silver md:text-[11px]">{count}商品</p>
          )}
        </div>
        <span className="series-filter-card__arrow flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-mist text-graphite transition-all duration-300 group-hover/card:border-ink group-hover/card:text-ink">
          <IconArrow />
        </span>
      </div>

      {active && (
        <span className="series-filter-card__badge absolute right-2 top-2 px-1.5 py-px text-[8px] font-medium tracking-wide">
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
  const ref = useReveal<HTMLElement>();

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
    <section
      ref={ref}
      id="series-filters"
      aria-label="シリーズフィルター"
      className="border-b border-mist bg-paper"
    >
      <div className="mx-auto max-w-[1280px] px-4 py-7 md:px-8 md:py-9">
        <div className="reveal flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="label-track text-[10px] font-medium text-metal">フィルター</p>
            <h2 className="mt-1.5 font-[family-name:var(--font-editorial)] text-[24px] font-medium leading-tight text-ink md:text-[30px]">
              シリーズから探す
            </h2>
          </div>

          {hasSeriesFilter && (
            <button
              type="button"
              onClick={handleClearSeries}
              className="press border border-mist px-3 py-1.5 text-[11px] font-medium tracking-wide text-graphite transition-colors hover:border-ink hover:text-ink"
            >
              クリア
            </button>
          )}
        </div>

        {/* Mobile — horizontal compact carousel */}
        <div className="reveal mt-5 md:hidden">
          <div className="series-filter-carousel -mx-4 flex snap-x snap-mandatory gap-2.5 overflow-x-auto px-4 pb-1 scrollbar-hide">
            <div className="w-[68vw] min-w-[210px] max-w-[260px] shrink-0 snap-start">
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
                  className="w-[68vw] min-w-[210px] max-w-[260px] shrink-0 snap-start"
                >
                  <SeriesFilterCard
                    label={series.id === "accessories" ? series.name : series.nameShort}
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

        {/* Desktop — 3-column compact grid */}
        <div className="reveal mt-5 hidden gap-3 md:grid md:grid-cols-3">
          <SeriesFilterCard
            label="すべて"
            alt="すべてのシリーズ"
            active={!hasSeriesFilter}
            onClick={handleClearSeries}
          />

          {VISUAL_SERIES.map((series) => {
            const count = countsBySeries.get(series.id) ?? 0;
            const isExternal = series.id === "accessories" && count === 0;

            return (
              <SeriesFilterCard
                key={series.id}
                label={series.id === "accessories" ? series.name : series.nameShort}
                image={series.image}
                alt={series.name}
                active={filters.series.includes(series.id)}
                count={count > 0 ? count : undefined}
                external={isExternal}
                href={isExternal ? series.url : undefined}
                onClick={isExternal ? undefined : () => handleToggle(series.id)}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

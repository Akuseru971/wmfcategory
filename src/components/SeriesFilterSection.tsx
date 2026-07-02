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
    <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 16 16" fill="none" aria-hidden="true">
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
  const className = `series-filter-card press group/card flex h-full w-full flex-col overflow-hidden text-left ${
    active ? "is-active" : ""
  }`;

  const content = (
    <>
      <div className="series-filter-card__media relative aspect-[5/4] w-full overflow-hidden bg-cloud">
        {image ? (
          <Image
            src={image}
            alt={alt}
            fill
            className="series-filter-card__image object-contain p-5 transition-transform duration-500 ease-out group-hover/card:scale-[1.04]"
            sizes="(max-width: 768px) 42vw, 320px"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 px-4">
            <span className="font-[family-name:var(--font-editorial)] text-[28px] font-medium leading-none text-ink/80">
              All
            </span>
            <span className="text-[11px] tracking-wide text-graphite">すべて</span>
          </div>
        )}
        {active && (
          <span className="series-filter-card__badge absolute left-3 top-3 px-2 py-0.5 text-[9px] font-medium tracking-wide">
            選択中
          </span>
        )}
      </div>

      <div className="series-filter-card__body flex flex-1 items-center justify-between gap-3 px-4 py-3.5">
        <div className="min-w-0 flex-1">
          <p className="truncate text-[13px] font-medium leading-snug text-ink md:text-[14px]">{label}</p>
          {count !== undefined && (
            <p className="mt-0.5 text-[11px] text-silver">{count}商品</p>
          )}
        </div>
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-mist text-graphite transition-all duration-300 group-hover/card:border-ink group-hover/card:text-ink group-[.is-active]/card:border-ink group-[.is-active]/card:bg-ink group-[.is-active]/card:text-paper">
          <IconArrow />
        </span>
      </div>
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
      <div className="mx-auto max-w-[1280px] px-4 py-10 md:px-8 md:py-14">
        <div className="reveal flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="label-track text-[10px] font-medium text-metal">フィルター</p>
            <h2 className="mt-2 font-[family-name:var(--font-editorial)] text-[28px] font-medium leading-tight text-ink md:text-[36px]">
              シリーズから探す
            </h2>
          </div>

          {hasSeriesFilter && (
            <button
              type="button"
              onClick={handleClearSeries}
              className="press border border-mist px-4 py-2 text-[11px] font-medium tracking-wide text-graphite transition-colors hover:border-ink hover:text-ink"
            >
              クリア
            </button>
          )}
        </div>

        {/* Mobile — horizontal premium carousel */}
        <div className="reveal mt-7 md:hidden">
          <div className="series-filter-carousel -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1 scrollbar-hide">
            <div className="w-[42vw] min-w-[148px] max-w-[180px] shrink-0 snap-start">
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
                  className="w-[42vw] min-w-[148px] max-w-[180px] shrink-0 snap-start"
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

        {/* Desktop — 3-column premium grid */}
        <div className="reveal mt-8 hidden gap-5 md:grid md:grid-cols-3">
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

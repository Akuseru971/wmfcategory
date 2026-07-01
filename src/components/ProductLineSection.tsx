"use client";

import Image from "next/image";
import { KNIFE_CATEGORIES, SERIES, type KnifeCategoryId, type SeriesId } from "@/data/products";

export type LineTab = "category" | "series";

interface ProductLineSectionProps {
  activeTab: LineTab;
  onTabChange: (tab: LineTab) => void;
  activeCategory: KnifeCategoryId | "all";
  activeSeries: SeriesId | "all";
  onCategorySelect: (id: KnifeCategoryId) => void;
  onSeriesSelect: (id: SeriesId) => void;
}

function scrollToProducts() {
  document.getElementById("products")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function ProductLineSection({
  activeTab,
  onTabChange,
  activeCategory,
  activeSeries,
  onCategorySelect,
  onSeriesSelect,
}: ProductLineSectionProps) {
  return (
    <section id="product-line" className="mx-auto max-w-[1280px] px-4 py-10 md:px-8 md:py-14">
      <div className="text-center">
        <h2 className="font-[family-name:var(--font-editorial)] text-[28px] font-medium leading-none text-ink md:text-[40px]">
          Category Page
        </h2>
        <p className="mt-1 font-[family-name:var(--font-editorial)] text-[22px] font-medium text-graphite md:text-[30px]">
          Product Line
        </p>
      </div>

      <div className="tab-group mx-auto mt-8 max-w-[480px] md:mt-10">
        <div className="grid grid-cols-2 gap-1 rounded-lg border border-mist bg-cloud p-1">
          {(["category", "series"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={`tab-btn press rounded-md py-3 text-[13px] font-medium tracking-wide transition-all duration-300 md:py-3.5 md:text-[14px] ${
                activeTab === tab
                  ? "bg-paper text-ink shadow-sm"
                  : "text-silver hover:text-graphite"
              }`}
            >
              {tab === "category" ? "Category" : "Series"}
            </button>
          ))}
        </div>

        <div className="tab-panel mt-4 rounded-xl border border-mist bg-paper p-4 md:p-6">
          <div
            className={`tab-content transition-opacity duration-300 ${
              activeTab === "category" ? "opacity-100" : "hidden opacity-0"
            }`}
          >
            <div className="-mx-1 overflow-x-auto px-1 scrollbar-hide md:overflow-visible">
              <div className="grid min-w-[280px] grid-cols-2 gap-2 md:gap-3">
                {KNIFE_CATEGORIES.map((cat) => {
                  const isActive = activeCategory === cat.id;
                  const isExternal = !!cat.externalUrl;

                  const content = (
                    <>
                      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-cloud">
                        <Image
                          src={cat.image}
                          alt=""
                          fill
                          className="object-contain p-1.5"
                          sizes="40px"
                          loading="lazy"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[12.5px] font-medium text-ink md:text-[13px]">{cat.name}</p>
                        <p className="mt-0.5 truncate text-[10.5px] text-silver">{cat.description}</p>
                      </div>
                      <span className="nav-item-line ml-2 h-px w-4 bg-mist" aria-hidden="true" />
                    </>
                  );

                  if (isExternal) {
                    return (
                      <a
                        key={cat.id}
                        href={cat.externalUrl}
                        className="nav-item press flex items-center rounded-lg border border-transparent px-3 py-3 transition-all hover:border-mist hover:bg-cloud md:py-3.5"
                      >
                        {content}
                      </a>
                    );
                  }

                  return (
                    <button
                      key={cat.id}
                      onClick={() => {
                        onCategorySelect(cat.id);
                        scrollToProducts();
                      }}
                      className={`nav-item press flex w-full items-center rounded-lg border px-3 py-3 text-left transition-all md:py-3.5 ${
                        isActive
                          ? "border-ink bg-cloud"
                          : "border-transparent hover:border-mist hover:bg-cloud"
                      }`}
                    >
                      {content}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div
            className={`tab-content transition-opacity duration-300 ${
              activeTab === "series" ? "opacity-100" : "hidden opacity-0"
            }`}
          >
            <div className="-mx-1 overflow-x-auto px-1 scrollbar-hide md:overflow-visible">
              <div className="grid min-w-[280px] grid-cols-2 gap-2 md:gap-3">
                {SERIES.map((series) => {
                  const isActive = activeSeries === series.id;
                  const isExternal = series.id === "accessories";

                  const content = (
                    <>
                      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-cloud">
                        <Image
                          src={series.image}
                          alt=""
                          fill
                          className="object-contain p-1.5"
                          sizes="40px"
                          loading="lazy"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[12.5px] font-medium leading-snug text-ink md:text-[13px]">
                          {series.nameShort}
                        </p>
                      </div>
                      <span className="nav-item-line ml-2 h-px w-4 bg-mist" aria-hidden="true" />
                    </>
                  );

                  if (isExternal) {
                    return (
                      <a
                        key={series.id}
                        href={series.url}
                        className="nav-item press flex items-center rounded-lg border border-transparent px-3 py-3 transition-all hover:border-mist hover:bg-cloud md:py-3.5"
                      >
                        {content}
                      </a>
                    );
                  }

                  return (
                    <button
                      key={series.id}
                      onClick={() => {
                        onSeriesSelect(series.id);
                        scrollToProducts();
                      }}
                      className={`nav-item press flex w-full items-center rounded-lg border px-3 py-3 text-left transition-all md:py-3.5 ${
                        isActive
                          ? "border-ink bg-cloud"
                          : "border-transparent hover:border-mist hover:bg-cloud"
                      }`}
                    >
                      {content}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { COMPARISON_COLUMNS, getProductByGgcd } from "@/data/products";
import { useReveal } from "@/hooks/useReveal";

export default function ComparisonSection() {
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} className="border-y border-mist bg-cloud py-12 md:py-16">
      <div className="mx-auto max-w-[1280px] px-4 md:px-8">
        <div className="relative grid gap-10 md:grid-cols-2 md:gap-16">
          <div
            className="absolute left-1/2 top-4 hidden h-[calc(100%-2rem)] w-px -translate-x-1/2 border-l border-dashed border-silver/50 md:block"
            aria-hidden="true"
          />

          {COMPARISON_COLUMNS.map((col, i) => {
            const product = getProductByGgcd(col.productGgcd);
            if (!product) return null;

            return (
              <article
                key={col.label}
                className="reveal flex flex-col items-center text-center"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="relative h-20 w-20 overflow-hidden rounded-full border border-mist bg-paper shadow-sm md:h-24 md:w-24">
                  <Image
                    src={col.iconImage}
                    alt=""
                    fill
                    className="object-contain p-3"
                    sizes="96px"
                    loading="lazy"
                  />
                </div>

                <p className="label-track mt-5 text-[10px] font-medium text-metal">{col.label}</p>
                <h3 className="mt-2 text-[17px] font-medium text-ink md:text-[19px]">{col.title}</h3>
                <p className="mt-2 max-w-[260px] text-[12px] leading-relaxed text-graphite">
                  {col.description}
                </p>

                <a
                  href={product.url}
                  className="compare-product-card press mt-6 block w-full max-w-[220px] rounded-lg border border-mist bg-paper p-3 transition-shadow hover:shadow-md"
                >
                  <div className="relative mx-auto aspect-square w-full max-w-[140px] overflow-hidden rounded-md bg-cloud">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain p-3"
                      sizes="140px"
                      loading="lazy"
                    />
                  </div>
                  <p className="mt-3 line-clamp-2 text-[11.5px] leading-snug text-ink">{product.name}</p>
                  <p className="mt-1 text-[13px] font-semibold text-ink">
                    ¥{product.price.toLocaleString("ja-JP")}
                  </p>
                </a>

                <a
                  href={product.url}
                  className="press mt-4 inline-flex h-9 items-center border border-ink px-5 text-[11px] font-medium tracking-wide text-ink transition-colors hover:bg-ink hover:text-paper"
                >
                  商品を見る
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

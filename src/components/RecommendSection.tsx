"use client";

import Image from "next/image";
import { getRecommendProducts } from "@/data/products";
import { useReveal } from "@/hooks/useReveal";

export default function RecommendSection() {
  const ref = useReveal<HTMLElement>();
  const products = getRecommendProducts();

  return (
    <section ref={ref} className="bg-deep py-14 md:py-20">
      <div className="mx-auto max-w-[1280px] px-4 md:px-8">
        <p className="label-track reveal text-[10px] font-medium text-paper/50">BEST SELLERS</p>
        <h2 className="reveal mt-2 font-[family-name:var(--font-editorial)] text-[32px] font-medium text-paper md:text-[44px]">
          Recommend
        </h2>

        <div className="reveal -mx-4 mt-8 overflow-x-auto px-4 scrollbar-hide md:mx-0 md:px-0">
          <div className="flex gap-4 md:grid md:grid-cols-3 md:gap-5 lg:grid-cols-4">
            {products.map((product, i) => (
              <article
                key={product.ggcd}
                className="reveal recommend-card w-[200px] shrink-0 md:w-auto"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <a href={product.url} className="group block">
                  <div className="relative aspect-square overflow-hidden rounded-lg border border-paper/10 bg-paper/5 transition-colors group-hover:border-paper/25">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 200px, 25vw"
                      loading="lazy"
                    />
                    <span className="absolute left-2 top-2 flex h-7 w-7 items-center justify-center bg-paper text-[12px] font-semibold text-ink">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="mt-3 line-clamp-2 min-h-[2.4em] text-[12px] leading-snug text-paper/90">
                    {product.name}
                  </h3>
                  <p className="mt-1.5 text-[14px] font-semibold text-paper">
                    ¥{product.price.toLocaleString("ja-JP")}
                  </p>
                  <span className="btn-cta-gold press mt-3 flex h-9 w-full items-center justify-center text-[11px] font-medium">
                    商品を見る
                  </span>
                </a>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

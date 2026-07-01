"use client";

import Image from "next/image";
import { getRecommendProducts } from "@/data/products";
import { useReveal } from "@/hooks/useReveal";

export default function RecommendSection() {
  const ref = useReveal<HTMLElement>();
  const products = getRecommendProducts();

  return (
    <section
      id="recommend"
      ref={ref}
      aria-label="おすすめ商品"
      className="border-t border-mist bg-deep py-14 md:py-20"
    >
      <div className="mx-auto max-w-[1280px] px-4 md:px-8">
        <p className="label-track reveal text-[10px] font-medium text-paper/50">BEST SELLERS</p>
        <h2 className="reveal mt-2 font-[family-name:var(--font-editorial)] text-[32px] font-medium text-paper md:text-[44px]">
          Recommend
        </h2>

        {/* Mobile: horizontal swipe carousel */}
        <div className="reveal mt-8 md:hidden">
          <div className="recommend-carousel -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 scrollbar-hide">
            {products.map((product, i) => (
              <article
                key={product.ggcd}
                className="w-[72vw] max-w-[240px] shrink-0 snap-center"
              >
                <RecommendCard product={product} rank={i + 1} />
              </article>
            ))}
          </div>
        </div>

        {/* Desktop: premium grid */}
        <div className="reveal mt-8 hidden md:grid md:grid-cols-3 md:gap-5 lg:grid-cols-4">
          {products.map((product, i) => (
            <article key={product.ggcd}>
              <RecommendCard product={product} rank={i + 1} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function RecommendCard({
  product,
  rank,
}: {
  product: ReturnType<typeof getRecommendProducts>[number];
  rank: number;
}) {
  return (
    <a href={product.url} className="group block">
      <div className="relative aspect-square overflow-hidden rounded-lg border border-paper/10 bg-paper/5 transition-colors group-hover:border-paper/25">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 72vw, 25vw"
          loading="lazy"
        />
        <span className="absolute left-2 top-2 flex h-7 w-7 items-center justify-center bg-paper text-[12px] font-semibold text-ink">
          {rank}
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
  );
}

import Image from "next/image";
import type { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  return (
    <article className="product-card group">
      <a href={product.url} className="block">
        <div className="wmf-product-stage relative aspect-square w-full overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="product-image object-contain p-4 md:p-5"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            loading="lazy"
          />
          {index !== undefined && index < 3 && (
            <span className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center bg-ink text-[13px] font-semibold text-paper">
              {index + 1}
            </span>
          )}
          {product.badges.length > 0 && (
            <div className="absolute right-2 top-2 flex flex-col gap-1">
              {product.badges.map((badge) => (
                <span
                  key={badge}
                  className={`px-2 py-0.5 text-[9px] font-medium tracking-wide ${
                    badge === "10年保証"
                      ? "bg-ink text-paper"
                      : "bg-paper/95 text-ink border border-mist"
                  }`}
                >
                  {badge === "WMF ギフトラッピング" ? "ギフトラッピング" : badge}
                </span>
              ))}
            </div>
          )}
        </div>

        <h3 className="mt-3 line-clamp-2 min-h-[2.6em] text-[12.5px] leading-snug text-ink md:text-[13px]">
          {product.name}
        </h3>

        <div className="mt-1.5 flex items-baseline gap-2">
          <span className="text-[14px] font-semibold text-ink md:text-[15px]">
            ¥{product.price.toLocaleString("ja-JP")}
          </span>
          <span className="text-[10px] text-silver">（税込）</span>
        </div>

        <span className="product-cta btn-cta-gold press mt-3 flex h-10 w-full items-center justify-center text-[12px] font-medium">
          商品を見る
        </span>
      </a>
    </article>
  );
}

import Image from "next/image";
import type { CategoryProduct } from "@/data/types";

interface ProductCardProps {
  product: CategoryProduct;
  index?: number;
}

const BADGE_PRIORITY = ["10年保証", "WMF ギフトラッピング", "無水調理", "IH/ガス対応"];

function formatBadgeLabel(badge: string): string {
  if (badge === "WMF ギフトラッピング") return "ギフトラッピング";
  return badge;
}

function sortBadges(badges: string[]): string[] {
  return [...badges].sort((a, b) => {
    const ai = BADGE_PRIORITY.indexOf(a);
    const bi = BADGE_PRIORITY.indexOf(b);
    const aRank = ai === -1 ? BADGE_PRIORITY.length : ai;
    const bRank = bi === -1 ? BADGE_PRIORITY.length : bi;
    return aRank - bRank;
  });
}

function formatPrice(price: number): string {
  if (!price || price <= 0) return "価格未定";
  return `¥${price.toLocaleString("ja-JP")}`;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const displayBadges = sortBadges(product.badges);
  const hasPrice = product.price > 0;

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
        </div>

        {displayBadges.length > 0 && (
          <div className="product-badge-row mt-2.5">
            {displayBadges.map((badge) => (
              <span key={badge} className="product-badge-pill">
                {formatBadgeLabel(badge)}
              </span>
            ))}
          </div>
        )}

        <h3
          className={`line-clamp-2 min-h-[2.6em] text-[12.5px] leading-snug text-ink md:text-[13px] ${
            displayBadges.length > 0 ? "mt-2" : "mt-3"
          }`}
        >
          {product.name}
        </h3>

        <div className="mt-1.5 flex items-baseline gap-2">
          <span
            className={`text-[14px] font-semibold md:text-[15px] ${
              hasPrice ? "text-ink" : "text-graphite"
            }`}
          >
            {formatPrice(product.price)}
          </span>
          {hasPrice && <span className="text-[10px] text-silver">（税込）</span>}
        </div>

        <span className="product-cta btn-cta-black press mt-3 flex h-10 w-full items-center justify-center text-[12px] font-medium">
          商品を見る
        </span>
      </a>
    </article>
  );
}

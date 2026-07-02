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
    <article className="product-card product-grid-cell group">
      <a href={product.url} className="product-card-link block">
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

        <div
          className={`flex items-start justify-between gap-2 ${
            displayBadges.length > 0 ? "mt-2" : "mt-3"
          }`}
        >
          <h3 className="product-card-title line-clamp-2 min-h-[2.6em] flex-1 text-[12.5px] leading-snug text-ink md:text-[13px]">
            {product.name}
          </h3>
          <span className="product-card-arrow" aria-hidden="true">
            →
          </span>
        </div>

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
      </a>
    </article>
  );
}

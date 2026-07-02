import type { CategoryBreadcrumbItem } from "@/data/types";

interface BreadcrumbProps {
  items: CategoryBreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="パンくずリスト" className="mx-auto max-w-[1280px] px-4 pt-6 md:px-8">
      <ol className="flex flex-wrap items-center gap-1 text-[11px] text-silver">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-1">
            {i > 0 && <span className="text-metal">&gt;</span>}
            {i === items.length - 1 ? (
              <span className="text-graphite">{item.label}</span>
            ) : (
              <a href={item.url} className="transition-colors hover:text-ink">
                {item.label}
              </a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

import Link from "next/link";
import { CATEGORY_NAV } from "@/data/category-nav";

interface CategorySwitchProps {
  activeId: string;
}

export default function CategorySwitch({ activeId }: CategorySwitchProps) {
  return (
    <nav
      aria-label="カテゴリー切り替え"
      className="category-switch pointer-events-none absolute inset-x-0 top-3 z-20 flex justify-center px-4 md:top-4 md:justify-end md:px-8"
    >
      <div className="category-switch__track pointer-events-auto inline-flex items-center rounded-full border border-paper/20 bg-paper/10 p-0.5 backdrop-blur-sm md:bg-paper/12">
        {CATEGORY_NAV.map((item) => {
          const isActive = item.id === activeId;

          return (
            <Link
              key={item.id}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={`category-switch__btn press rounded-full px-3 py-1.5 text-[10px] font-medium tracking-wide transition-all md:px-3.5 md:text-[11px] ${
                isActive ? "category-switch__btn--active" : ""
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

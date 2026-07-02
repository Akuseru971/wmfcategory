import Image from "next/image";
import type { CategoryHero } from "@/data/types";

interface HeroProps {
  hero: CategoryHero;
}

export default function Hero({ hero }: HeroProps) {
  return (
    <section className="relative mt-[3.75rem] bg-ink" aria-label="カテゴリーヒーロー">
      <div className="relative h-[240px] w-full sm:h-[280px] md:h-[380px] lg:h-[420px]">
        <Image
          src={hero.image}
          alt={hero.alt}
          fill
          priority
          className="object-cover object-[center_42%]"
          sizes="100vw"
        />
        <div className="category-hero-overlay absolute inset-0" aria-hidden="true" />

        <div className="absolute inset-0 flex flex-col justify-end px-6 pb-8 pt-16 md:px-10 md:pb-12">
          <p className="label-track text-[10px] font-medium text-metal">{hero.label}</p>
          <h1 className="claim-track mt-2 max-w-[520px] text-[28px] font-medium leading-[1.3] text-paper md:text-[42px]">
            {hero.title}
          </h1>
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";

const CATEGORY_HERO_IMAGE = "/images/category-hero.png?v=20260702";

export default function Hero() {
  return (
    <section className="relative mt-[3.75rem] bg-ink" aria-label="カテゴリーヒーロー">
      <div className="relative h-[240px] w-full sm:h-[280px] md:h-[380px] lg:h-[420px]">
        <Image
          src={CATEGORY_HERO_IMAGE}
          alt="包丁・ナイフ"
          fill
          priority
          className="object-cover object-[center_42%]"
          sizes="100vw"
        />
        <div className="category-hero-overlay absolute inset-0" aria-hidden="true" />

        <div className="absolute inset-0 flex flex-col justify-end px-6 pb-8 pt-16 md:px-10 md:pb-12">
          <p className="label-track text-[10px] font-medium text-metal">WMF KNIVES</p>
          <h1 className="claim-track mt-2 max-w-[520px] text-[28px] font-medium leading-[1.3] text-paper md:text-[42px]">
            包丁・ナイフ
          </h1>
        </div>
      </div>
    </section>
  );
}

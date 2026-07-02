import Image from "next/image";

const CATEGORY_HERO_IMAGE = "/images/category-hero.jpg";

export default function Hero() {
  return (
    <section className="relative mt-[3.75rem] bg-ink" aria-label="カテゴリーヒーロー">
      <div className="relative h-[200px] w-full sm:h-[240px] md:h-[300px] lg:h-[340px]">
        <Image
          src={CATEGORY_HERO_IMAGE}
          alt="包丁・ナイフ"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="category-hero-overlay absolute inset-0" aria-hidden="true" />

        <div className="absolute inset-0 flex flex-col justify-end px-6 pb-8 pt-16 md:px-10 md:pb-10">
          <p className="label-track text-[10px] font-medium text-metal">WMF KNIVES</p>
          <h1 className="claim-track mt-2 max-w-[520px] text-[28px] font-medium leading-[1.3] text-paper md:text-[40px]">
            包丁・ナイフ
          </h1>
        </div>
      </div>
    </section>
  );
}

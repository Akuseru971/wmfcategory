import Image from "next/image";
import { SHOP_BASE } from "@/data/products";

export default function Hero() {
  const heroImages = [
    `${SHOP_BASE}/g_images/3201002755/3201002755_00_ptn.jpg`,
    `${SHOP_BASE}/g_images/3201112330/3201112330_00_ptn.jpg`,
    `${SHOP_BASE}/g_images/3201113273/3201113273_00_ptn.jpg`,
  ];

  return (
    <section className="relative mt-[3.75rem] overflow-hidden bg-deep">
      <div className="absolute inset-0">
        <div className="grid h-full grid-cols-3">
          {heroImages.map((src, i) => (
            <div key={src} className="relative h-full overflow-hidden">
              <Image
                src={src}
                alt=""
                fill
                className="object-contain object-center p-6 opacity-40 md:p-10"
                sizes="33vw"
                priority={i === 0}
              />
            </div>
          ))}
        </div>
        <div className="hero-overlay absolute inset-0" />
      </div>

      <div className="relative mx-auto flex min-h-[280px] max-w-[1280px] flex-col justify-center px-6 py-12 md:min-h-[420px] md:px-8 md:py-20">
        <p className="label-track text-[10px] font-medium text-paper/70 md:text-[11px]">WMF KNIVES</p>
        <h1
          className="mt-3 font-[family-name:var(--font-editorial)] text-[36px] font-medium leading-[1.15] text-paper md:mt-4 md:text-[56px]"
        >
          包丁・ナイフ
        </h1>
        <p className="claim-track mt-4 max-w-[480px] text-[13px] leading-relaxed text-paper/80 md:mt-5 md:text-[15px]">
          切れ味、耐久性、美しさを兼ね備えたWMFのプレミアムナイフ。
        </p>
        <div className="mt-6 flex flex-wrap gap-3 md:mt-8">
          <a
            href="#products"
            className="btn-primary press inline-flex h-11 items-center px-7 text-[12px] font-medium"
          >
            商品を見る
          </a>
          <a
            href="#series"
            className="btn-secondary press inline-flex h-11 items-center border-paper/60 px-7 text-[12px] font-medium text-paper hover:border-paper hover:bg-paper hover:text-ink"
          >
            シリーズで探す
          </a>
        </div>
      </div>
    </section>
  );
}

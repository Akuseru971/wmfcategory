import Image from "next/image";
import { SHOP_BASE } from "@/data/products";

export default function Hero() {
  const heroImage = `${SHOP_BASE}/g_images/3201002755/3201002755_00_ptn.jpg`;

  return (
    <section className="relative mt-[3.75rem] overflow-hidden bg-cloud">
      <div className="mx-auto grid max-w-[1280px] items-center gap-6 px-4 py-10 md:grid-cols-2 md:gap-12 md:px-8 md:py-14">
        <div className="order-2 md:order-1">
          <p className="label-track text-[10px] font-medium text-metal md:text-[11px]">WMF KNIVES</p>
          <h1 className="mt-2 font-[family-name:var(--font-editorial)] text-[32px] font-medium leading-[1.15] text-ink md:mt-3 md:text-[48px]">
            包丁・ナイフ
          </h1>
          <p className="claim-track mt-3 max-w-[400px] text-[13px] leading-relaxed text-graphite md:mt-4 md:text-[14px]">
            切れ味、耐久性、美しさを兼ね備えたWMFのプレミアムナイフ。
          </p>
          <div className="mt-5">
            <a
              href="#products"
              className="btn-primary press inline-flex h-10 items-center px-6 text-[12px] font-medium"
            >
              商品を見る
            </a>
          </div>
        </div>

        <div className="order-1 relative aspect-[4/3] overflow-hidden rounded-xl border border-mist bg-paper md:order-2 md:aspect-[5/4]">
          <Image
            src={heroImage}
            alt="ダマスティール 三徳ナイフ PC"
            fill
            className="object-contain p-6 md:p-10"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
      </div>
    </section>
  );
}

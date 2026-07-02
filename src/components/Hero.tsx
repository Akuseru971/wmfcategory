import Image from "next/image";
import { SHOP_BASE } from "@/data/products";

export default function Hero() {
  const heroImage = `${SHOP_BASE}/d_images/common/wmf_knives/bnr_wmfLink.jpg`;

  return (
    <section className="relative bg-ink" aria-label="ヒーロー">
      <div className="relative h-[78vh] max-h-[640px] w-full">
        <Image
          src={heroImage}
          alt="包丁・ナイフ"
          fill
          priority
          className="object-cover object-[center_35%]"
          sizes="100vw"
        />
        <div className="wmf-overlay-hero absolute inset-0" aria-hidden="true" />

        <div className="absolute inset-x-0 bottom-0 px-6 pb-16 pt-24">
          <p className="label-track text-[10px] font-medium text-metal">WMF KNIVES</p>
          <h1 className="claim-track mt-3 max-w-[320px] text-[26px] font-medium leading-[1.35] text-paper">
            包丁・ナイフ
          </h1>
          <p className="copy-body mt-3 max-w-[300px] text-[13px] text-paper/85">
            切れ味、耐久性、美しさを兼ね備えたWMFのプレミアムナイフ。
          </p>
          <div className="mt-6 flex flex-col gap-2.5">
            <a
              href="#products"
              className="press flex h-12 w-full items-center justify-center bg-cta-gold text-[13px] font-medium tracking-wide text-ink"
            >
              商品を見る
            </a>
            <a
              href="#catalog"
              className="press flex h-12 w-full items-center justify-center border border-paper/60 text-[13px] font-medium tracking-wide text-paper"
            >
              シリーズを見る
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

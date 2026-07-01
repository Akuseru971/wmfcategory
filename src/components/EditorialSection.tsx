"use client";

import Image from "next/image";
import { SHOP_BASE } from "@/data/products";
import { useReveal } from "@/hooks/useReveal";

const BENEFITS = [
  {
    title: "優れた切れ味",
    description: "ドイツの精錬技術が生み出す、長く続く鋭い切れ味。",
  },
  {
    title: "美しいバランス",
    description: "手に馴染む重心設計で、料理の所作まで美しく。",
  },
  {
    title: "長く使える品質",
    description: "厳選された素材と職人技が、長年の愛用に応えます。",
  },
];

export default function EditorialSection() {
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} className="bg-cloud py-16 md:py-24">
      <div className="mx-auto max-w-[1280px] px-4 md:px-8">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <p className="label-track reveal text-[10px] font-medium text-metal md:text-[11px]">
              CRAFTED FOR PRECISION
            </p>
            <h2 className="reveal mt-2 font-[family-name:var(--font-editorial)] text-[28px] font-medium leading-snug text-ink md:text-[36px]">
              料理の所作まで、美しく。
            </h2>
            <p className="reveal copy-body mt-4 text-[13px] leading-relaxed text-graphite md:text-[14px]">
              WMFのナイフは、1853年の創業以来培われたドイツの精錬技術と、
              プロフェッショナルの現場で磨き上げられた設計思想の結晶です。
              切れ味の鋭さ、手に馴染むバランス、そして長く使い続けられる耐久性。
              毎日のキッチンに、確かな品質と佇まいをお届けします。
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {BENEFITS.map((benefit, i) => (
                <article
                  key={benefit.title}
                  className="reveal border border-mist bg-paper p-5"
                  style={{ transitionDelay: `${(i + 1) * 80}ms` }}
                >
                  <h3 className="text-[13px] font-medium text-ink">{benefit.title}</h3>
                  <p className="mt-2 text-[11.5px] leading-relaxed text-graphite">
                    {benefit.description}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="reveal relative aspect-[4/5] overflow-hidden bg-paper">
            <Image
              src={`${SHOP_BASE}/g_images/3201002755/3201002755_00_ptn.jpg`}
              alt="ダマスティール 三徳ナイフ PC"
              fill
              className="object-contain p-8 md:p-12"
              sizes="(max-width: 768px) 100vw, 50vw"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-paper/90 to-transparent p-6">
              <p className="text-[11px] text-silver">ダマスティール 三徳ナイフ PC</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useReveal } from "@/hooks/useReveal";

const ITEMS = [
  {
    num: "01",
    title: "メーカー公式ショップ",
    description: "公式ならではの豊富な品揃えと安心の品質保証。",
  },
  {
    num: "02",
    title: "無料ギフトサービス",
    description: "ラッピング・メッセージカードを無料でご用意します。",
  },
  {
    num: "03",
    title: "あんしんの保証",
    description: "公式ショップ購入品は保証対象。長く愛用いただけます。",
  },
  {
    num: "04",
    title: "安全なお支払い",
    description: "各種クレジットカード・Amazon Payなど安心の決済方法。",
  },
];

export default function OfficialShop() {
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} className="py-16 md:py-24">
      <div className="mx-auto max-w-[1280px] px-4 md:px-8">
        <p className="label-track reveal text-[10px] font-medium text-metal md:text-[11px]">
          OFFICIAL SHOP
        </p>
        <h2 className="reveal mt-1.5 text-[19px] font-medium text-ink md:text-[24px]">
          公式ショップの安心
        </h2>

        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {ITEMS.map((item, i) => (
            <article
              key={item.num}
              className="reveal"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="flex h-full flex-col border border-mist p-5 md:p-6">
                <span className="brand-track text-[12px] font-semibold text-metal">
                  {item.num}
                </span>
                <h3 className="mt-3 text-[13.5px] font-medium leading-snug text-ink">
                  {item.title}
                </h3>
                <p className="copy-body mt-2 text-[11.5px] leading-relaxed text-graphite">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

import { SHOP_BASE } from "@/data/products";

const FOOTER_COLUMNS = [
  {
    title: "商品カテゴリー",
    links: [
      { label: "調理器具", href: `${SHOP_BASE}/shop/goods/list.html?cid=WMF-cookware` },
      { label: "包丁＆ナイフ", href: `${SHOP_BASE}/shop/goods/list.html?cid=WMF-knives` },
      { label: "キッチンツール", href: `${SHOP_BASE}/shop/goods/list.html?cid=WMF-kitchentools` },
      { label: "カトラリー", href: `${SHOP_BASE}/shop/goods/list.html?cid=WMF-cutlery` },
      { label: "ドリンクウェア", href: `${SHOP_BASE}/shop/goods/list.html?cid=WMF-drinkware` },
    ],
  },
  {
    title: "ご利用ガイド",
    links: [
      { label: "ご注文について", href: `${SHOP_BASE}/shop/guide/order.html` },
      { label: "お支払い・配送について", href: `${SHOP_BASE}/shop/guide/payment.html` },
      { label: "返品について", href: `${SHOP_BASE}/shop/guide/return.html` },
      { label: "会員について", href: `${SHOP_BASE}/shop/guide/member.html` },
      { label: "商品・保証について", href: `${SHOP_BASE}/shop/guide/guarantee.html` },
      { label: "よくあるご質問", href: `${SHOP_BASE}/shop/guide/faq.html` },
    ],
  },
  {
    title: "お問い合わせ",
    links: [
      { label: "お問い合わせフォーム", href: `${SHOP_BASE}/shop/inquiry/index.html` },
      { label: "ご利用規約", href: `${SHOP_BASE}/shop/guide/terms.html` },
      { label: "特定商取引法に基づく表記", href: `${SHOP_BASE}/shop/guide/law.html` },
      { label: "プライバシーポリシー", href: `${SHOP_BASE}/shop/guide/privacy.html` },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-deep text-paper">
      <div className="mx-auto max-w-[1280px] px-4 py-14 md:px-8 md:py-20">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 40.352 50.074"
              width="24"
              height="30"
              aria-label="WMF"
              role="img"
            >
              <path
                fill="#FFFFFF"
                d="M34.784 34.058h4.2v3.456h-4.2V49.99h-6.618V29.173l3.874-6.913h7.505v6.913h-4.68v4.89ZM7.667 0l8.151 14.752 6.214-11.3 6.215 11.3L36.479 0h3.873L26.391 25.206l-6.215-11.3-6.214 11.3L.004 0ZM5.892 31.612v18.461H2.583V22.255h5.81l5.488 9.947 6.295-11.3 4.6 8.261V49.99h-6.617V31.612l-6.055 11.044L5.89 31.613Z"
              />
            </svg>
            <p className="mt-4 text-[12px] leading-relaxed text-paper/60">
              WMF公式オンラインショップ
              <br />
              ドイツ生まれのプレミアムキッチンウェア
            </p>
            <div className="mt-4 flex gap-4">
              <a
                href="https://www.instagram.com/wmf_japan/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-paper/50 transition-colors hover:text-paper"
                aria-label="Instagram"
              >
                Instagram
              </a>
              <a
                href="https://www.wmf.co.jp/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-paper/50 transition-colors hover:text-paper"
              >
                WMF 公式サイト
              </a>
            </div>
          </div>

          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="label-track text-[10px] font-medium text-paper/40">{col.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[12px] text-paper/70 transition-colors hover:text-paper"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-paper/10 pt-6">
          <p className="text-[11px] text-paper/40">
            © Groupe SEB Japan 株式会社. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

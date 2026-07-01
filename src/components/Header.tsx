"use client";

import { useEffect, useState } from "react";
import { SHOP_BASE } from "@/data/products";

function WmfLogo({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 40.352 50.074"
      width="22"
      height="28"
      className={`block shrink-0 ${className}`}
      aria-label="WMF"
      role="img"
    >
      <path
        fill="currentColor"
        d="M34.784 34.058h4.2v3.456h-4.2V49.99h-6.618V29.173l3.874-6.913h7.505v6.913h-4.68v4.89ZM7.667 0l8.151 14.752 6.214-11.3 6.215 11.3L36.479 0h3.873L26.391 25.206l-6.215-11.3-6.214 11.3L.004 0ZM5.892 31.612v18.461H2.583V22.255h5.81l5.488 9.947 6.295-11.3 4.6 8.261V49.99h-6.617V31.612l-6.055 11.044L5.89 31.613Z"
      />
    </svg>
  );
}

function IconMenu() {
  return (
    <svg className="h-[22px] w-[22px]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function IconSearch() {
  return (
    <svg className="h-[22px] w-[22px]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M16 16l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function IconAccount() {
  return (
    <svg className="h-[22px] w-[22px]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="3.6" stroke="currentColor" strokeWidth="1.6" />
      <path d="M5 20c0-3.6 3.1-6 7-6s7 2.4 7 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function IconCart() {
  return (
    <svg className="h-[22px] w-[22px]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 7h13l-1.2 8.4a2 2 0 0 1-2 1.7H9.2a2 2 0 0 1-2-1.7L6 4H3.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9.5" cy="20" r="1.1" fill="currentColor" />
      <circle cx="16" cy="20" r="1.1" fill="currentColor" />
    </svg>
  );
}

const NAV_LINKS = [
  { label: "調理器具", href: `${SHOP_BASE}/shop/goods/list.html?cid=WMF-cookware` },
  { label: "包丁＆ナイフ", href: `${SHOP_BASE}/shop/goods/list.html?cid=WMF-knives` },
  { label: "キッチンツール", href: `${SHOP_BASE}/shop/goods/list.html?cid=WMF-kitchentools` },
  { label: "カトラリー", href: `${SHOP_BASE}/shop/goods/list.html?cid=WMF-cutlery` },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "header-scrolled" : "bg-paper"
        }`}
      >
        <div className="mx-auto flex h-[3.75rem] max-w-[1280px] items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-6">
            <button
              className="press flex h-11 w-11 items-center justify-center text-ink md:hidden"
              aria-label="メニュー"
              onClick={() => setMenuOpen(true)}
            >
              <IconMenu />
            </button>
            <a href={SHOP_BASE + "/shop/"} className="press flex items-center" aria-label="WMF ホーム">
              <WmfLogo />
            </a>
            <nav className="hidden items-center gap-6 md:flex">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-[12px] tracking-wide text-graphite transition-colors hover:text-ink"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
          <div className="flex items-center">
            <a
              href={`${SHOP_BASE}/shop/goods/search.html`}
              className="press flex h-11 w-11 items-center justify-center text-ink"
              aria-label="検索"
            >
              <IconSearch />
            </a>
            <a
              href={`${SHOP_BASE}/shop/member/index.html`}
              className="press flex h-11 w-11 items-center justify-center text-ink"
              aria-label="マイページ"
            >
              <IconAccount />
            </a>
            <a
              href={`${SHOP_BASE}/shop/cart/index.html`}
              className="press relative flex h-11 w-11 items-center justify-center text-ink"
              aria-label="カート"
            >
              <IconCart />
            </a>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div className="drawer-backdrop absolute inset-0" onClick={() => setMenuOpen(false)} />
          <div className="absolute top-0 left-0 right-0 bg-paper shadow-lg">
            <div className="flex h-[3.75rem] items-center justify-between px-4">
              <WmfLogo />
              <button
                className="press flex h-11 w-11 items-center justify-center text-ink"
                aria-label="閉じる"
                onClick={() => setMenuOpen(false)}
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <nav className="border-t border-mist px-4 py-6">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block border-b border-mist py-4 text-[14px] text-ink"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href={`${SHOP_BASE}/shop/guide/index.html`}
                className="block border-b border-mist py-4 text-[14px] text-graphite"
              >
                ご利用ガイド
              </a>
              <a
                href={`${SHOP_BASE}/shop/inquiry/index.html`}
                className="block py-4 text-[14px] text-graphite"
              >
                お問い合わせ
              </a>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}

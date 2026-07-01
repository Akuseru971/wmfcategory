"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Breadcrumb from "@/components/Breadcrumb";
import ProductGrid from "@/components/ProductGrid";
import EditorialSection from "@/components/EditorialSection";
import OfficialShop from "@/components/OfficialShop";
import Footer from "@/components/Footer";
import FilterDrawer from "@/components/FilterDrawer";
import type { SeriesId, SortType } from "@/data/products";

export default function CategoryPage() {
  const [activeSeries, setActiveSeries] = useState<SeriesId | "all">("all");
  const [sortType, setSortType] = useState<SortType>("normal");
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Breadcrumb />
        <ProductGrid
          activeSeries={activeSeries}
          onSeriesChange={setActiveSeries}
          sortType={sortType}
          onSortChange={setSortType}
          onFilterOpen={() => setFilterOpen(true)}
        />
        <EditorialSection />
        <OfficialShop />
      </main>
      <Footer />
      <FilterDrawer
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        activeSeries={activeSeries}
        onSeriesChange={setActiveSeries}
      />
    </>
  );
}

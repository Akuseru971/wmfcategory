"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Breadcrumb from "@/components/Breadcrumb";
import ProductLineSection, { type LineTab } from "@/components/ProductLineSection";
import ComparisonSection from "@/components/ComparisonSection";
import ProductGrid from "@/components/ProductGrid";
import RecommendSection from "@/components/RecommendSection";
import Footer from "@/components/Footer";
import FilterDrawer from "@/components/FilterDrawer";
import type { KnifeCategoryId, SeriesId, SortType } from "@/data/products";

export default function CategoryPage() {
  const [activeTab, setActiveTab] = useState<LineTab>("category");
  const [activeCategory, setActiveCategory] = useState<KnifeCategoryId | "all">("all");
  const [activeSeries, setActiveSeries] = useState<SeriesId | "all">("all");
  const [sortType, setSortType] = useState<SortType>("normal");
  const [filterOpen, setFilterOpen] = useState(false);

  const handleCategorySelect = (id: KnifeCategoryId) => {
    setActiveCategory(id);
    setActiveSeries("all");
    setActiveTab("category");
  };

  const handleSeriesSelect = (id: SeriesId) => {
    setActiveSeries(id);
    setActiveCategory("all");
    setActiveTab("series");
  };

  const handleClearFilters = () => {
    setActiveCategory("all");
    setActiveSeries("all");
  };

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Breadcrumb />
        <ProductLineSection
          activeTab={activeTab}
          onTabChange={setActiveTab}
          activeCategory={activeCategory}
          activeSeries={activeSeries}
          onCategorySelect={handleCategorySelect}
          onSeriesSelect={handleSeriesSelect}
        />
        <ComparisonSection />
        <ProductGrid
          activeCategory={activeCategory}
          activeSeries={activeSeries}
          sortType={sortType}
          onSortChange={setSortType}
          onFilterOpen={() => setFilterOpen(true)}
        />
        <RecommendSection />
      </main>
      <Footer />
      <FilterDrawer
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        activeCategory={activeCategory}
        activeSeries={activeSeries}
        onCategorySelect={handleCategorySelect}
        onSeriesSelect={handleSeriesSelect}
        onClear={handleClearFilters}
      />
    </>
  );
}

"use client";

import { useMemo, useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Breadcrumb from "@/components/Breadcrumb";
import SeriesFilterSection from "@/components/SeriesFilterSection";
import ProductGrid from "@/components/ProductGrid";
import RecommendSection from "@/components/RecommendSection";
import Footer from "@/components/Footer";
import FilterSidebar from "@/components/filters/FilterSidebar";
import FilterBottomSheet from "@/components/filters/FilterBottomSheet";
import SortBottomSheet from "@/components/filters/SortBottomSheet";
import { EMPTY_FILTERS, filterProducts, type ProductFilters } from "@/lib/filters";
import { PRODUCTS, type SortType } from "@/data/products";

export default function CategoryPage() {
  const [appliedFilters, setAppliedFilters] = useState<ProductFilters>(EMPTY_FILTERS);
  const [draftFilters, setDraftFilters] = useState<ProductFilters>(EMPTY_FILTERS);
  const [sortType, setSortType] = useState<SortType>("normal");
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const previewCount = useMemo(
    () => filterProducts(PRODUCTS, draftFilters).length,
    [draftFilters]
  );

  const openFilters = () => {
    setDraftFilters(appliedFilters);
    setFilterOpen(true);
  };

  const applyFilters = () => {
    setAppliedFilters(draftFilters);
    setFilterOpen(false);
  };

  const closeFilters = () => {
    setDraftFilters(appliedFilters);
    setFilterOpen(false);
  };

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Breadcrumb />
        <SeriesFilterSection filters={appliedFilters} onFiltersChange={setAppliedFilters} />
        <ProductGrid
          filters={appliedFilters}
          onFiltersChange={setAppliedFilters}
          sortType={sortType}
          onSortChange={setSortType}
          onFilterOpen={openFilters}
          onSortOpen={() => setSortOpen(true)}
        />
        <RecommendSection />
      </main>
      <Footer />

      <FilterSidebar
        open={filterOpen}
        onClose={closeFilters}
        draftFilters={draftFilters}
        onDraftChange={setDraftFilters}
        onApply={applyFilters}
        previewCount={previewCount}
      />
      <FilterBottomSheet
        open={filterOpen}
        onClose={closeFilters}
        draftFilters={draftFilters}
        onDraftChange={setDraftFilters}
        onApply={applyFilters}
        previewCount={previewCount}
      />
      <SortBottomSheet
        open={sortOpen}
        onClose={() => setSortOpen(false)}
        value={sortType}
        onChange={setSortType}
      />
    </>
  );
}

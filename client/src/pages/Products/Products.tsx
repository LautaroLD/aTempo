import React from "react";
import ProductCarousel from "../../components/ProductCarousel/ProductCarousel";
import InstaCarousel from "../../components/InstaCarousel/InstaCarousel";
import ProductList from "../../components/ProductList/ProductList";
import FilterDropdown from "../../components/FilterDropdown/FilterDropdown";

export default function Products() {
  return (
    <div>
      <ProductCarousel />
      <InstaCarousel />
      <ProductList />
      <FilterDropdown />
    </div>
  );
}

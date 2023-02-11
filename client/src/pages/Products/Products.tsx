import React from "react";
import ProductCarousel from "../../components/ProductCarousel/ProductCarousel";
import InstaCarousel from "../../components/InstaCarousel/InstaCarousel";
import ProductList from "../../components/ProductList/ProductList";

export default function Products() {
  return (
    <div>
      <ProductCarousel />
      <InstaCarousel />
      <ProductList />
    </div>
  );
}

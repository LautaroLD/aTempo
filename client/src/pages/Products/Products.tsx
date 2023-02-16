import React from "react";

import ProductList from "../../components/ProductList/ProductList";
import FilterDropdown from "../../components/FilterDropdown/FilterDropdown";

export default function Products() {
  return (
    <div>
      <ProductList />
      <FilterDropdown />
    </div>
  );
}

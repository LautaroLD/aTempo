import { useState } from "react";
import ProductList from "../../components/ProductList/ProductList";
import FilterDropdown from "../../components/FilterDropdown/FilterDropdown";
import { useLocation } from "react-router-dom";

export default function Products() {
  const [filtersOpen, setFiltersOpen] = useState<boolean>(false);
  const { state } = useLocation();
  const { inputSearch, resultSearch } = state;

  return (
    <div>
      {filtersOpen ? (
        <FilterDropdown setFiltersOpen={setFiltersOpen} filtersOpen={filtersOpen} />
      ) : (
        <ProductList
          inputSearch={inputSearch}
          resultSearch={resultSearch}
          setFiltersOpen={setFiltersOpen}
          filtersOpen={filtersOpen}
        />
      )}
    </div>
  );
}

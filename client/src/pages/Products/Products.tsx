import { useState, useEffect } from "react";
import ProductList from "../../components/ProductList/ProductList";
import FilterDropdown from "../../components/FilterDropdown/FilterDropdown";
import { useLocation } from "react-router-dom";
import { AppDispatch, AppStore } from "../../app/store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllProducts } from "../../app/state/productsSlice";

export default function Products() {
  const [filtersOpen, setFiltersOpen] = useState<boolean>(false);
  const { state } = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const { list } = useSelector((store: AppStore) => store.products);
  useEffect(() => {
    if (list.length === 0) dispatch(getAllProducts());
  }, []);
  let input = "todos los productos";
  let result = [...list];
  if (state) {
    const { inputSearch, resultSearch } = state;
    input = inputSearch;
    result = resultSearch;
  }

  return (
    <div>
      {filtersOpen ? (
        <FilterDropdown setFiltersOpen={setFiltersOpen} filtersOpen={filtersOpen} />
      ) : (
        <ProductList
          inputSearch={input}
          resultSearch={result}
          setFiltersOpen={setFiltersOpen}
          filtersOpen={filtersOpen}
        />
      )}
    </div>
  );
}

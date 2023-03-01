import ProductCard from "../ProductCarousel/ProductCard/ProductCard";
import FilterDropdown from "../FilterDropdown/FilterDropdown";
import { Product } from "../../models/Product";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppDispatch, AppStore } from "../../app/store";
import { getAllProducts } from "../../app/state/productsSlice";

interface Props {
  setFiltersOpen: (active: boolean) => void;
  filtersOpen: boolean;
  inputSearch: string;
  resultSearch: Array<Product>;
}

const ProductList = ({
  setFiltersOpen,
  filtersOpen,
  inputSearch,
  resultSearch
}: Props): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const prodList = useSelector((store: AppStore) => store.products.list);

  useEffect(() => {
    if (prodList.length > 0) dispatch(getAllProducts());
  }, []);

  return (
    <div className="productlist">
      <p className="productlist__text">Inicio - Resultados: "{inputSearch}"</p>
      <p className="productlist__title">Resultados: "{inputSearch}"</p>
      <button className="productlist__btn" onClick={() => setFiltersOpen(true)}>
        Definir filtros
      </button>
      <p className="productlist__text__pagination">{resultSearch.length} Productos</p>
      <div className="productlist__card__group">
        {resultSearch.map(prod => {
          return <ProductCard key={prod.id} product={prod} />;
        })}
      </div>
      {filtersOpen && <FilterDropdown setFiltersOpen={setFiltersOpen} filtersOpen={filtersOpen} />}
    </div>
  );
};

export default ProductList;

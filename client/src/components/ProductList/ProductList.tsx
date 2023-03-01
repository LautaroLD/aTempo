import ProductCard from "../ProductCarousel/ProductCard/ProductCard";
import FilterDropdown from "../FilterDropdown/FilterDropdown";
import { Product } from "../../models/Product";

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

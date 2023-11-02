import ProductCard from "../ProductCarousel/ProductCard/ProductCard";
import FilterDropdown from "../FilterDropdown/FilterDropdown";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Product } from "../../models/Product";
import { getAllProducts } from "../../app/state/productsSlice";
import { AppDispatch, AppStore } from "../../app/store";

interface Props {
  inputSearch: string;
  resultSearch: Array<Product>;
}

const ProductList = ({ inputSearch, resultSearch }: Props): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const prodList = useSelector((store: AppStore) => store.products.list);

  const [filtersOpen, setFiltersOpen] = useState<boolean>(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth);

  useEffect(() => {
    if (prodList.length > 0) dispatch(getAllProducts());
  }, []);

  const changeWidth = () => {
    setIsDesktop(window.innerWidth);
    if (isDesktop > 550) {
      setFiltersOpen(true);
    } else {
      setFiltersOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", changeWidth);
    return () => {
      window.removeEventListener("resize", changeWidth);
    };
  }, [isDesktop]);

  return (
    <div className="productlist">
      <p className="productlist__text">Inicio - Resultados: "{inputSearch}"</p>
      <p className="productlist__text__pagination">{resultSearch.length} Productos</p>
      <div className="container_filter_productList">
        <div className="container__button">
          {!filtersOpen && (
            <button className="productlist__btn" onClick={() => setFiltersOpen(true)}>
              Definir filtros
            </button>
          )}
          {filtersOpen && (
            <FilterDropdown setFiltersOpen={setFiltersOpen} filtersOpen={filtersOpen} />
          )}
        </div>
        <div className="productlist__card__group">
          {resultSearch.map(prod => {
            return <ProductCard key={prod.id} product={prod} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductList;

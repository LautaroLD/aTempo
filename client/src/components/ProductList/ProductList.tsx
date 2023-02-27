import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import ProductCard from "../ProductCarousel/ProductCard/ProductCard";
import FilterDropdown from "../FilterDropdown/FilterDropdown";
import { getAllProducts } from "../../app/state/productsSlice";
import { AppDispatch, AppStore } from "../../app/store";
import { MdArrowForwardIos } from "react-icons/md";

interface Props {
  setFiltersOpen: (active: boolean) => void;
  filtersOpen: boolean;
}

const ProductList = ({ setFiltersOpen, filtersOpen }: Props): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const prodList = useSelector((store: AppStore) => store.products.list);

  useEffect(() => {
    if (prodList.length > 0) dispatch(getAllProducts());
  }, []);

  return (
    <div className="productlist">
      <p className="productlist__text">Inicio - Resultados: "zapato"</p>
      <p className="productlist__title">Resultados: "zapato"</p>
      <button className="productlist__btn" onClick={() => setFiltersOpen(true)}>
        Definir filtros
      </button>
      <p className="productlist__text__pagination">1-24/74 Productos</p>
      <div className="productlist__card__group">
        {prodList.map(prod => {
          return <ProductCard key={prod.id} product={prod} />;
        })}
      </div>
      <div className="productlist__pagination">
        <button className="productlist__pagination__btn">1</button>
        <button className="productlist__pagination__btn">2</button>
        <button className="productlist__pagination__btn">3</button>
        <button className="productlist__pagination__btn">4</button>
        <button className="productlist__pagination__btn">
          <MdArrowForwardIos />
        </button>
      </div>
      {filtersOpen && <FilterDropdown setFiltersOpen={setFiltersOpen} filtersOpen={filtersOpen} />}
    </div>
  );
};

export default ProductList;

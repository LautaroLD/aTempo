import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProductList from "../../components/ProductList/ProductList";
import { getAllProducts } from "../../app/state/productsSlice";
import { AppDispatch, AppStore } from "../../app/store";

export default function Products() {
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
      <ProductList inputSearch={input} resultSearch={result} />
    </div>
  );
}

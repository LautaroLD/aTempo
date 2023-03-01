import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppStore } from "../../../app/store";
import { getAllProducts } from "../../../app/state/productsSlice";
import Spinner from "../../Spinner/Spinner";
import { BiEdit, BiTrash } from "react-icons/bi";
import { AiOutlineEye } from "react-icons/ai";

export default function ShopProducts() {
  const dispatch = useDispatch<AppDispatch>();

  const prodList = useSelector((store: AppStore) => store.products.list);

  useEffect(() => {
    if (prodList.length === 0) dispatch(getAllProducts());
  }, []);

  if (prodList.length === 0) return <Spinner />;

  return (
    <div className="shop-products">
      <div className="shop-products__content">
        <div className="shop-products__content__header">
          <p className="shop-products__content__header__text">PRODUCTOS DE LA TIENDA</p>
          <button className="shop-products__content__header__btn">Agregar Producto +</button>
        </div>
        <table className="shop-products__content__table">
          <tr className="shop-products__content__table__tr">
            <th>ID/REF</th>
            <th>Imagenes</th>
            <th>Titulo</th>
            <th>Marca</th>
            <th>Precio</th>
            <th>Stock</th>
            <th></th>
          </tr>
          {prodList.map(prod => {
            return (
              <tr key={`shop-product-${prod.id}`} className="shop-products__content__table__tr">
                <td>{prod.id}</td>
                <td>
                  <img
                    alt={prod.name}
                    className="shop-products__content__table__tr__imgProd"
                    src={prod.ProductImgs[0].imgUrl}
                  />
                </td>
                <td>{prod.name}</td>
                <td>
                  <img
                    alt={prod.Brand.name}
                    className="shop-products__content__table__tr__imgBrand"
                    src={prod.Brand.imgBrand}
                  />
                </td>
                <td>${prod.price}</td>
                <td>{prod.quantityInStock}</td>
                <td>
                  <AiOutlineEye className="shop-products__content__table__tr__icon" />{" "}
                  <BiEdit className="shop-products__content__table__tr__icon" />{" "}
                  <BiTrash color="red" className="shop-products__content__table__tr__icon" />
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
}

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppStore } from "../../app/store";
import { CartProducts } from "../../models/Cart";
import { getLocalStorage } from "../../utils/LocalStorageFunctions";

export default function ProductCartDropdown() {
  // const cart = useSelector((store: AppStore) => store.auth.user.Cart);
  const auth = getLocalStorage("auth");
  const cart = auth.user.Cart
  return (
    <div className="cartdropdown">
      <div className="cartdropdown__pendant"></div>
      {cart.Products && cart.Products.length !== 0 &&
        cart?.Products?.map((product: CartProducts) => {
          return (
            <div key={product.id}>
              <div className="cartdropdown__header">
                <img
                  src={product.ProductImgs[0].imgUrl}
                  alt={product.Brand.name}
                  className="cartdropdown__header__img"
                />
                <div className="cartdropdown__header__info">
                  <div className="cartdropdown__header__info__top">
                    <p className="cartdropdown__header__info__title">{product.Brand.name}</p>
                  </div>

                  <div className="cartdropdown__header__info__bottom">
                    <p className="cartdropdown__header__info__qty">
                      x{product.ProductsInCart.quantity}
                    </p>
                    <p className="cartdropdown__header__info__price">${product.price}</p>
                  </div>
                </div>
              </div>
              <hr />
            </div>
          );
        })}

      <div className="cartdropdown__body">
        <div className="cartdropdown__body__info">
          <p className="cartdropdown__body__info__text">Subtotal carrito:</p>
          <p className="cartdropdown__body__info__price">${cart.totalPrice}</p>
        </div>
        <Link to={"/cart"}>
          <button className="cartdropdown__body__btn">Ver carrito</button>
        </Link>
      </div>
    </div>
  );
}

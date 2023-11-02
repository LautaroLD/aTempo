import { BiTrash } from "react-icons/bi";
import { CartProducts } from "../../../models/Cart";

type CartBodyProps = {
  products: CartProducts[];
  total: string;
  deleteProduct: (product: CartProducts) => void;
};

export default function CartBody({ products, total, deleteProduct }: CartBodyProps) {
  return (
    <div className="cart__body">
      <h1 className="cart__body__title">DETALLE DEL PEDIDO</h1>
      {products?.map((product: CartProducts) => {
        return (
          <div key={product.id}>
            <div className="cart__body__info">
              <img
                className="cart__body__info__img"
                src={product.ProductImgs[0].imgUrl}
                alt="calzado"
              />
              <div className="cart__body__info__description" key={`[${product.id}]`}>
                <h2 className="cart__body__info__description__title">{product.Brand.name}</h2>
                <span className="cart__body__info__description__detail">
                  <p className="cart__body__info__description__detail__type">Color:</p>
                  <p className="cart__body__info__description__detail__item">
                    {product.ProductsInCart.color}
                  </p>
                </span>
                <span className="cart__body__info__description__detail">
                  <p className="cart__body__info__description__detail__type">Horma:</p>
                  <p className="cart__body__info__description__detail__item">
                    {product.ProductsInCart.last}
                  </p>
                </span>
                <span className="cart__body__info__description__detail">
                  <p className="cart__body__info__description__detail__type">Talle:</p>
                  <p className="cart__body__info__description__detail__item">
                    {product.ProductsInCart.size}
                  </p>
                </span>
                <span className="cart__body__info__description__detail">
                  <p className="cart__body__info__description__detail__type">Precio:</p>
                  <p className="cart__body__info__description__detail__item">${product.price}</p>
                </span>
              </div>
            </div>

            <div className="cart__body__actions" key={`actions[${product.id}]`}>
              <div className="cart__body__actions__container">
                <span className="cart__body__actions__container__action">-</span>
                <p className="cart__body__actions__container__quantity">
                  {product.ProductsInCart.quantity}
                </p>
                <span className="cart__body__actions__container__action">+</span>
              </div>
              <div className="cart__body__actions__totaldelete">
                <p className="cart__body__actions__totaldelete__price">
                  ${product.price * product.ProductsInCart.quantity}
                </p>
                <BiTrash
                  id={product.id}
                  className="cart__body__actions__totaldelete__trash"
                  onClick={() => deleteProduct(product)}
                />
              </div>
            </div>
          </div>
        );
      })}

      <div className="cart__body__amounts">
        <p className="cart__body__amounts__title">Costo de envío</p>
        <p className="cart__body__amounts__price">$0</p>
      </div>
      <div className="cart__body__amounts2">
        <p className="cart__body__amounts2__title">Importe total</p>
        <p className="cart__body__amounts2__price">${total}</p>
      </div>

      <p className="cart__body__cupon">¿Tíenes un cupón de descuento?</p>
      <input className="cart__body__cuponInput" type="text" placeholder="Ingrese el código" />
      <button className="cart__body__applycupon">APLICAR CUPÓN</button>
    </div>
  );
}

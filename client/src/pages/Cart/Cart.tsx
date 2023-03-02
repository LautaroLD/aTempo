import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { User } from "../../models/User";
import { AppDispatch, AppStore } from "../../app/store";
import { toast } from "react-toastify";
import CartBody from "../../components/Cart/CartBody/CartBody";
import CartButtons from "../../components/Cart/CartButtons/CartButtons";
import CartHeader from "../../components/Cart/CartHeader/CartHeader";
import CartMessage from "../../components/Cart/CartMessage/CartMessage";
import EditDirection from "../../components/ProfileComponents/EditDirection/EditDirection";
import EditProfile from "../../components/ProfileComponents/EditProfile/EditProfile";
import { CartModel, CartProducts } from "../../models/Cart";
import { getCart, removeProductOfCart } from "../../app/state/authSlice";
import { useDispatch } from "react-redux";
import { setLocalStorage, getLocalStorage } from "../../utils/LocalStorageFunctions";
import { getRequest } from "../../services/httpRequest";
import Spinner from "../../components/Spinner/Spinner";

export default function Cart() {
  const dispatch = useDispatch<AppDispatch>();
  const [stage, setStage] = useState<number>(1);
  const UserInformation: User = useSelector((store: AppStore) => store.auth.user);
  const UserCart: CartModel = useSelector((store: AppStore) => store.auth.user.Cart);
  const UserLocalStorage = getLocalStorage("auth");
  const [isLoadingPay, setIsLoadingPay] = useState<boolean>(false);

  const handlePay = () => {
    setIsLoadingPay(true);

    getRequest("/mpago/process")
      .then(res => {
        window.location.href = res.link;
      })
      .catch(err => {
        setIsLoadingPay(false);
        toast.error("Se ha producido un error al generar tu pago, intentá en unos minutos", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored"
        });
      });
  };

  const incrementStage = (stage: number): void => {
    if (stage === 3) {
      handlePay();
    } else {
      if (stage === 1) {
        if (UserInformation.documentId !== null && UserInformation.birthdate !== null) {
          setStage(stage + 1);
        } else {
          toast.error("Necesitas completar y guardar tus datos de usuario", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored"
          });
        }
      } else {
        if (UserInformation.Addresses) {
          setStage(stage + 1);
        } else {
          toast.error("Necesitas completar y guardar tu dirección", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored"
          });
        }
      }
    }
  };
  const decrementStage = (stage: number): void => {
    if (stage === 1) {
      return;
    } else {
      setStage(stage - 1);
    }
  };
  const deleteProduct = async (product: CartProducts) => {
    await dispatch(
      removeProductOfCart({
        idCart: UserCart.id,
        idProduct: product.id,
        quantity: product.ProductsInCart.quantity
      })
    );
    const cart = await dispatch(getCart(UserCart.id));
    UserLocalStorage.user.Cart = cart;
    setLocalStorage("auth", UserLocalStorage);
  };

  return (
    <div className="cart">
      {UserCart?.Products?.length !== 0 ? (
        <>
          <CartHeader stage={stage} />
          <div className="cart__container">
            {stage === 1 && <EditProfile mode="cart" />}
            {stage === 2 && <EditDirection mode="cart" />}
            {isLoadingPay ? (
              <Spinner />
            ) : (
              <CartBody
                deleteProduct={deleteProduct}
                total={UserCart.totalPrice}
                products={UserLocalStorage.user?.Cart?.Products}
              />
            )}
          </div>
          {isLoadingPay ? (
            <p>Yendo a MercadoPago, aguardá unos instantes...</p>
          ) : (
            <CartButtons
              stage={stage}
              incrementStage={incrementStage}
              decrementStage={decrementStage}
            />
          )}
          {stage !== 3 ? (
            <p className="cart__offert">
              ¡SE ACERCAN LAS MUESTRAS DE FIN DE AÑO! Aprovecha un 20% OFF en compras al por mayor
            </p>
          ) : (
            <CartMessage />
          )}
        </>
      ) : (
        <>
          <div className="cart__empty">
            <h2 className="cart__empty__title">Comienza a llenar tu carrito</h2>
            <p className="cart__empty__text">
              Todas tus marcas favoritas en un solo lugar y puedes comprarlas hasta en 18 cuotas sin
              recargo.
            </p>
            <Link className="cart__empty__button" to="/products">
              Ver calzados
            </Link>
          </div>
          <CartMessage />
        </>
      )}
    </div>
  );
}

import { BsCheck2Circle } from "react-icons/bs";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { User } from "../../models/User";
import { AppDispatch, AppStore } from "../../app/store";
import { toast } from "react-toastify";
import { CartModel, CartProducts } from "../../models/Cart";
import { getCart, removeProductOfCart } from "../../app/state/authSlice";
import { useDispatch } from "react-redux";
import { setLocalStorage, getLocalStorage } from "../../utils/LocalStorageFunctions";
import { getRequest } from "../../services/httpRequest";
import Spinner from "../../components/Spinner/Spinner";

export default function Success() {
  const dispatch = useDispatch<AppDispatch>();
  const UserInformation: User = useSelector((store: AppStore) => store.auth.user);
  const UserCart: CartModel = useSelector((store: AppStore) => store.auth.user.Cart);
  const UserLocalStorage = getLocalStorage("auth");
  const [isLoadingPay, setIsLoadingPay] = useState<boolean>(false);

  const [params] = useSearchParams();

  const payment_id = params.get("payment_id");
  const status = params.get("status");
  const external_reference = params.get("external_reference");

  useEffect(() => {
    getRequest(
      `/mpago/success?payment_id=${payment_id}&status=${status}&external_reference=${external_reference}`
    )
      .then(async res => {
        const cart = await dispatch(getCart(UserCart.id));
        UserLocalStorage.user.Cart = cart;
        setLocalStorage("auth", UserLocalStorage);
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
  }, []);

  return (
    <section className="Success">
      <div className="Success__message">
        <BsCheck2Circle className="Success__message__icon" />
        <p className="Success__message__title">Se ha realizado su compra</p>
      </div>
      <p className="Success__message__text">Numero de orden #{external_reference}</p>
      <Link className="Success__btn" to="/">
        Volver al inicio
      </Link>
    </section>
  );
}

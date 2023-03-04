import { BsCheck2Circle } from "react-icons/bs";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AppDispatch, AppStore } from "../../app/store";
import { toast } from "react-toastify";
import { CartModel } from "../../models/Cart";
import { getCart } from "../../app/state/authSlice";
import { useDispatch } from "react-redux";
import { getRequest } from "../../services/httpRequest";

export default function Success() {
  const dispatch = useDispatch<AppDispatch>();
  const UserCart: CartModel = useSelector((store: AppStore) => store.auth.user.Cart);

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
        await dispatch(getCart(UserCart.id));
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

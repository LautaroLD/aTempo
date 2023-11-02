import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, AppStore } from "../../app/store";
import ProductCarousel from "../../components/ProductCarousel/ProductCarousel";
import InstaCarousel from "../../components/InstaCarousel/InstaCarousel";
import Offer from "../../components/Offer/Offer";
import News from "../../components/News/News";
import { getAllProducts } from "../../app/state/productsSlice";
import { getCart } from "../../app/state/authSlice";
import { User } from "../../models/User";
import { useSelector } from "react-redux";
import { getLocalStorage, setLocalStorage } from "../../utils/LocalStorageFunctions";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const UserInformation: User = useSelector((store: AppStore) => store.auth.user);
  const UserLocalStorage = getLocalStorage("auth");

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  return (
    <div className="">
      <Offer />
      <ProductCarousel />
      <News />
      <InstaCarousel />
    </div>
  );
}

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import ProductCarousel from "../../components/ProductCarousel/ProductCarousel";
import InstaCarousel from "../../components/InstaCarousel/InstaCarousel";
import Offer from "../../components/Offer/Offer";
import News from "../../components/News/News";
import { getAllProducts } from "../../app/state/productsSlice";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
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

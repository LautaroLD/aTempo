import ProductCarousel from "../../components/ProductCarousel/ProductCarousel";
import InstaCarousel from "../../components/InstaCarousel/InstaCarousel";
import Offer from "../../components/Offer/Offer";

export default function Home() {
  return (
    <div className="">
      <Offer />
      <ProductCarousel />
      <InstaCarousel />
    </div>
  );
}

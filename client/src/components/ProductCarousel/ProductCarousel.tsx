import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "../../styles/carousel.sass";

// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";
import ProductCard from "./ProductCard/ProductCard";

const ProductCarousel = () => {
  return (
    <div>
      <p className="carousel__title">Nuestros últimos productos</p>
      <Swiper
        cssMode={true}
        navigation={true}
        slidesPerView={2}
        pagination={{
          clickable: true
        }}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className="carousel"
      >
        <SwiperSlide>
          <ProductCard />
        </SwiperSlide>
        <SwiperSlide>
          <ProductCard />
        </SwiperSlide>
        <SwiperSlide>
          <ProductCard />
        </SwiperSlide>
        <SwiperSlide>
          <ProductCard />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default ProductCarousel;

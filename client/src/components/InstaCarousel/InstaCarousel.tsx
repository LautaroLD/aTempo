import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "../../styles/carousel.sass";

import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";
import InstaCard from "./InstaCard/InstaCard";

const images = [
  "https://images.pexels.com/photos/15130305/pexels-photo-15130305.jpeg?auto=compress&cs=tinysrgb&w",
  "https://images.pexels.com/photos/5705503/pexels-photo-5705503.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/8934629/pexels-photo-8934629.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/9154685/pexels-photo-9154685.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
];
const InstaCarousel = () => {
  return (
    <div>
      <p className="carousel__title">Nuestras marcas en instagram</p>
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
        className="carousel">
        {images.map(image => {
          return (
            <SwiperSlide>
              <InstaCard image={image} />
            </SwiperSlide>
          );
        })}
        {/*  <SwiperSlide>
          <InstaCard />
        </SwiperSlide>
        <SwiperSlide>
          <InstaCard />
        </SwiperSlide>
        <SwiperSlide>
          <InstaCard />
        </SwiperSlide> */}
      </Swiper>
    </div>
  );
};

export default InstaCarousel;

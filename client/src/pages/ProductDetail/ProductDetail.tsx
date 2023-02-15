import { useRef, useState, MouseEvent } from "react";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Keyboard, Zoom } from "swiper";
import { BsCircleFill } from "react-icons/bs";
import { TbMoodBoy } from "react-icons/tb";
import { GiPerson, GiBallerinaShoes } from "react-icons/gi";
import { AiFillHeart, AiOutlineHeart, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { ScoreStar } from "../../components/ScoreStar/ScoreStar";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/zoom";
import "../../styles/productDetail.sass";

type IsActive = {
  details: boolean;
  reviews: boolean;
};

const images = [
  "https://firebasestorage.googleapis.com/v0/b/c8t54pern.appspot.com/o/images%2Fproductpics%2Fzapato_negro.png?alt=media&token=a966f9c8-d66f-4458-a893-588c21b11a31",
  "https://firebasestorage.googleapis.com/v0/b/c8t54pern.appspot.com/o/images%2Fproductpics%2Fzapato_marron.png?alt=media&token=d56ecd56-b79b-4a2b-98d7-d4a3273ea8b6"
];

const colors = ["#000000", "#D8BEAF"];

const shoesName = ["R", "A"];

const sizes = [...new Array(39)];

export default function ProductDetail() {
  const ref = useRef<SwiperRef>(null);
  const [isFav, setIsFav] = useState<boolean>(false);
  const [isZoom, setIsZoom] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<IsActive>({ details: true, reviews: false });
  const [quantity, setQuantity] = useState<number>(0);

  const handleQuantity = (event: MouseEvent) => {
    if (event.currentTarget.id === "plus") return setQuantity(quantity + 1);
    setQuantity(quantity - 1);
    if (quantity <= 0) setQuantity(0);
  };

  const handleClickZoom = (): void => {
    if (ref.current) {
      if (isZoom) {
        ref.current.swiper.zoom.out();
      } else {
        ref.current.swiper.zoom.in();
      }
      setIsZoom(!isZoom);
    }
  };

  const handleActiveDetail = (event: MouseEvent) => {
    if (event.currentTarget.id === "detail") return setIsActive({ details: true, reviews: false });
    setIsActive({ details: false, reviews: true });
  };

  return (
    <div className="productDetail__container">
      <div className="img__container">
        <Swiper
          ref={ref}
          cssMode={true}
          navigation={false}
          slidesPerView={1}
          pagination={{
            clickable: true
          }}
          mousewheel={true}
          keyboard={true}
          modules={[Navigation, Pagination, Mousewheel, Keyboard, Zoom]}
          zoom={true}
          onClick={handleClickZoom}>
          {images.map((image, index) => {
            return (
              <SwiperSlide key={`prod-${index}`} zoom>
                <img className="img__product" src={image} alt="zapato " />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <section className="body__container">
        <p className="prod__title">Cadence</p>
        <div className="tags__container">
          <div className="tags__icons__text">
            <GiBallerinaShoes className="tags__icons" /> TAP
          </div>
          <div className="tags__icons__text">
            <GiPerson className="tags__icons" /> Unisex
          </div>
          <div className="tags__icons__text">
            <TbMoodBoy className="tags__icons" /> Niños
          </div>
        </div>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/c8t54pern.appspot.com/o/images%2Fbrands%2FSansha.png?alt=media&token=94eb82b7-0c8f-4ef6-b126-3dce43bf8feb"
          alt="sansha"
        />

        <div className="body__star">
          <div className="body__price">$86</div>
          <ScoreStar scoreStar={4} />
        </div>
        <hr className="body__line" />
        <div>
          <p className="title__prop">Color</p>
          <div className="body__colors">
            {colors.map((color, index) => {
              return (
                <BsCircleFill key={`color-${index}`} color={color} className="body__colors__icon" />
              );
            })}
          </div>
          <p className="title__prop">Horma</p>
          <div className="body__tag">
            {shoesName.map((shoe, index) => {
              return (
                <div key={`shoes-${index}`} className="body__tag__prop">
                  {shoe}
                </div>
              );
            })}
          </div>
          <p className="title__prop">Talle</p>
          <div className="body__tag">
            {sizes.map((size, index) => {
              return (
                <div key={`size-${index}`} className="body__tag__prop">
                  33.5
                </div>
              );
            })}
          </div>
          <p className="title__prop">Cantidad</p>
          <div className="body__quantity">
            <AiOutlineMinus id="minor" onClick={event => handleQuantity(event)} className="icon" />
            <input type="numeric" value={quantity} readOnly />
            <AiOutlinePlus id="plus" onClick={event => handleQuantity(event)} className="icon" />
          </div>
          <button className="btn__addcart" type="submit">
            Agregar al carrito
          </button>
          <div className="addFavorite" onClick={() => setIsFav(!isFav)}>
            {isFav ? (
              <AiFillHeart
                color="#E42E2E"
                className="card__header__icon"
                onClick={() => setIsFav(!isFav)}
              />
            ) : (
              <AiOutlineHeart className="card__header__icon" />
            )}
            <p>Agregar a lista de deseados</p>
          </div>
          <div className="tab__container">
            <button
              id="detail"
              onClick={event => handleActiveDetail(event)}
              className={`tab__btn ${isActive.details ? "tab__btn__active" : ""}`}>
              Detalles
            </button>
            <button
              onClick={event => handleActiveDetail(event)}
              className={`tab__btn ${isActive.reviews ? "tab__btn__active" : ""}`}>
              Reseñas
            </button>
          </div>
          {isActive.details ? (
            <div className="text__detail">
              <div className="text__detail__title">Zapato de claqué ligero cadence para niños</div>
              <p>
                Mira a tu artista favorito cerrar el escenario en el Cadence Tap Shoe. Cuenta con
                una suela de cuero duradera y los icónicos golpecitos de punta y talón Capezio® Tele
                Tone® para un sonido de toque inmaculado. El talón cónico y el ligero acolchado
                mantienen a los jóvenes bailarines moviéndose al ritmo sin ninguna dificultad.
                Características del producto: Parte superior de cuero suave Suela de piel Punteras y
                talones Tele Tone® Forro de poliéster Plantilla y collar ligeramente acolchados para
                mayor comodidad Puntera fuerte Talón cónico Parche de suela de goma ranurado para
                tracción Comience 1/2 - 1 talla más arriba de la talla de zapato de calle
              </p>
            </div>
          ) : (
            <div className="text__detail">
              <div className="text__detail__title">Alta reseñas</div>
              <p>Ta mortal el zapatito ese...</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

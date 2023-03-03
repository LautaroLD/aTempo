import { useRef, useState, MouseEvent, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, AppStore } from "../../app/store";
import { getProductsById } from "../../app/state/productsSlice";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Keyboard, Zoom } from "swiper";
import { ScoreStar } from "../../components/ScoreStar/ScoreStar";
import { Tags } from "../../components/Tags/Tags";
import { BsFillSuitDiamondFill } from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { ProductsInCart } from "../../models/ProductsInCart";
import { TypeTagsEmun } from "../../models/TypeTagsEmun";
import { addToCart, getCart } from "../../app/state/authSlice";
import { toast } from "react-toastify";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/zoom";
import Spinner from "../../components/Spinner/Spinner";

type IsActive = {
  details: boolean;
  reviews: boolean;
};

const imgDefault: string =
  "https://firebasestorage.googleapis.com/v0/b/c8t54pern.appspot.com/o/images%2Fproductpics%2Fatempo_default.png?alt=media&token=7baccf7c-d585-47d8-a4c0-0084db5689e7";

export default function ProductDetail() {
  const ref = useRef<SwiperRef>(null);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { Cart } = useSelector((store: AppStore) => store.auth.user);
  const product = useSelector((store: AppStore) => store.products.detail);

  const [isFav, setIsFav] = useState<boolean>(false);
  const [isZoom, setIsZoom] = useState<boolean>(false);
  const [missingData, setMissingData] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<IsActive>({ details: true, reviews: false });
  const [addCart, setAddCart] = useState<ProductsInCart>({
    ProductId: 0,
    CartId: 0,
    quantity: 0,
    color: "",
    size: "",
    last: ""
  });

  const { id } = useParams();

  useEffect(() => {
    if (!isNaN(Number(id))) {
      dispatch(getProductsById(Number(id)));
      setAddCart({ ...addCart, ProductId: Number(id) });
    }
  }, []);

  const handleQuantity = (event: MouseEvent) => {
    if (event.currentTarget.id === "plus")
      return setAddCart({ ...addCart, quantity: addCart.quantity + 1 });

    setAddCart({ ...addCart, quantity: addCart.quantity - 1 });

    if (addCart.quantity <= 0) setAddCart({ ...addCart, quantity: 0 });
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

  const handleAddtoCart = async (): Promise<void> => {
    if (
      addCart.color === "" ||
      addCart.size === "" ||
      addCart.last === "" ||
      addCart.quantity === 0
    ) {
      setMissingData(true);
    } else {
      setMissingData(false);
      const productAdded = await dispatch(addToCart(addCart));
      if (productAdded) {
        toast.success("Producto Agregado", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored"
        });
        await dispatch(getCart(productAdded.CardId));
        navigate("/products");
      } else {
        toast.error("Este producto ya se encuentra agregado", {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored"
        });
      }
    }
  };

  const handleActiveDetail = (event: MouseEvent) => {
    if (event.currentTarget.id === "detail") return setIsActive({ details: true, reviews: false });
    setIsActive({ details: false, reviews: true });
  };

  if (!product.id) return <Spinner />;

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
          onClick={handleClickZoom}
        >
          {product.ProductImgs.length !== 0 ? (
            product.ProductImgs.map((image, index) => {
              return (
                <SwiperSlide key={`prod-${index}`} zoom>
                  <img className="img__product" src={image.imgUrl} alt="zapato " />
                </SwiperSlide>
              );
            })
          ) : (
            <SwiperSlide zoom>
              <img className="img__product" src={imgDefault} alt="default " />
            </SwiperSlide>
          )}
        </Swiper>
      </div>
      <section className="body__container">
        <p className="prod__title">{product.name}</p>
        <div className="category__container">
          {product.Categories.map(categ => {
            return (
              <div key={`categ-${categ.id}`} className="category__icons__text">
                <BsFillSuitDiamondFill className="category__icons" /> {categ.name}
              </div>
            );
          })}
        </div>
        <img src={product.Brand?.imgBrand} alt="sansha" />

        <div className="body__star">
          <div className="body__price">${product.price}</div>
          <ScoreStar scoreStar={4} />
        </div>
        <hr className="body__line" />
        <div>
          <p className="title__prop">Color</p>
          <Tags
            dataTag={product.Colours.map(color => {
              return {
                id: color.id,
                name: color.colorName,
                value: color.colorValue
              };
            })}
            type={TypeTagsEmun.colors}
            addCart={addCart}
            setAddCart={setAddCart}
          />
          <p className="title__prop">Horma</p>
          <Tags
            dataTag={product.Last.map(last => {
              return {
                id: last.id,
                name: last.nameShoelast,
                value: last.nameShoelast
              };
            })}
            type={TypeTagsEmun.shoeLast}
            addCart={addCart}
            setAddCart={setAddCart}
          />
          <p className="title__prop">Talle</p>
          <Tags
            dataTag={product.Size.map(size => {
              return {
                id: size.id,
                name: size.sizeNumberAr,
                value: size.sizeNumberAr
              };
            })}
            type={TypeTagsEmun.sizes}
            addCart={addCart}
            setAddCart={setAddCart}
          />
          <p className="title__prop">Cantidad</p>
          <div className="body__quantity">
            <AiOutlineMinus id="minor" onClick={event => handleQuantity(event)} className="icon" />
            <input type="numeric" value={addCart.quantity} readOnly />
            <AiOutlinePlus id="plus" onClick={event => handleQuantity(event)} className="icon" />
          </div>
          {missingData && (
            <span className="missingData__notification__error">
              Controle que se haya seleccionado, cantidad, color, talle y horma
            </span>
          )}
          <button className="btn__addcart" onClick={handleAddtoCart}>
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
              className={`tab__btn ${isActive.details ? "tab__btn__active" : ""}`}
            >
              Detalles
            </button>
            <button
              onClick={event => handleActiveDetail(event)}
              className={`tab__btn ${isActive.reviews ? "tab__btn__active" : ""}`}
            >
              Reseñas
            </button>
          </div>
          {isActive.details ? (
            <div className="text__detail">
              <div className="text__detail__title">{product.name}</div>
              <p>{product.description}</p>
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

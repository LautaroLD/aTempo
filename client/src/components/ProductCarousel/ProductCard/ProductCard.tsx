import { useState, FC } from "react";
import { AiOutlineHeart, AiFillHeart, AiFillStar } from "react-icons/ai";
import { BsCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { Product } from "../../../models/Product";

interface Props {
  product: Product;
}

const ProductCard: FC<Props> = ({ product }) => {
  const [isFav, setIsFav] = useState(false);

  return (
    <>
      {isFav ? (
        <AiFillHeart color="#E42E2E" className="card__iconFav" onClick={() => setIsFav(!isFav)} />
      ) : (
        <AiOutlineHeart className="card__iconFav" onClick={() => setIsFav(!isFav)} />
      )}
      <Link to={`/product/${product.id}`} className="card__container">
        <div className="card">
          <div className="card__header">
            <img src={product?.ProductImgs[0]?.imgUrl} className="card__header__img" alt="" />
          </div>
          <div className="card__body">
            <div className="card__body__colors">
              {product.Colours.map(colour => {
                return (
                  <BsCircleFill
                    key={`colorProd-${colour.id}`}
                    color={colour.colorValue}
                    className="card__body__colors__icon"
                  />
                );
              })}
            </div>
            <p className="card__body__title">{product.name}</p>
            <p className="card__body__subtitle">Ref:{product.id}</p>
            <div className="card__body__star">
              <AiFillStar className="card__body__star__icon" color="#E42E2E" />
              <AiFillStar className="card__body__star__icon" color="#E42E2E" />
              <AiFillStar className="card__body__star__icon" color="#E42E2E" />
              <AiFillStar className="card__body__star__icon" color="#E42E2E" />
              <AiFillStar className="card__body__star__icon" color="#E42E2E" />
            </div>
            <p className="card__body__price">${product.price}</p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ProductCard;

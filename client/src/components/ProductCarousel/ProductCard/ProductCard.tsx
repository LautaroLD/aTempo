import React, { useState } from "react";
import "./productcard.sass";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BsCircleFill } from "react-icons/bs";

const ProductCard = () => {
  const [isFav, setIsFav] = useState(false);

  return (
    <div className="card">
      <div className="card__header">
        {isFav ? (
          <AiFillHeart
            color="#E42E2E"
            className="card__header__icon"
            onClick={() => setIsFav(!isFav)}
          />
        ) : (
          <AiOutlineHeart className="card__header__icon" onClick={() => setIsFav(!isFav)} />
        )}

        <img
          src="https://litb-cgis.rightinthebox.com/images/640x640/202204/bps/product/inc/fwfsga1649740801186.jpg"
          className="card__header__img"
          alt=""
        />
      </div>
      <div className="card__body">
        <div className="card__body__colors">
          <BsCircleFill color="#000000" className="card__body__colors__icon" />
          <BsCircleFill color="#9B5555" className="card__body__colors__icon" />
          <BsCircleFill color="#4B2417" className="card__body__colors__icon" />
        </div>
        <p className="card__body__title">Titulo del producto</p>
        <p className="card__body__subtitle">Ref:1475</p>
        <div className="card__body__star">
          <li className="card__body__star__icon">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSJclu3VU-1qgTkfdTd9K7hfza90UHjb_4RqTBz13y4lT14zCGqgUzHBX1hrqu2HE8Ta4&usqp=CAU"
              alt=""
            />
          </li>

          <li className="card__body__star__icon">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSJclu3VU-1qgTkfdTd9K7hfza90UHjb_4RqTBz13y4lT14zCGqgUzHBX1hrqu2HE8Ta4&usqp=CAU"
              alt=""
            />
          </li>
          <li className="card__body__star__icon">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSJclu3VU-1qgTkfdTd9K7hfza90UHjb_4RqTBz13y4lT14zCGqgUzHBX1hrqu2HE8Ta4&usqp=CAU"
              alt=""
            />
          </li>
          <li className="card__body__star__icon">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSJclu3VU-1qgTkfdTd9K7hfza90UHjb_4RqTBz13y4lT14zCGqgUzHBX1hrqu2HE8Ta4&usqp=CAU"
              alt=""
            />
          </li>
          <li className="card__body__star__icon">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSJclu3VU-1qgTkfdTd9K7hfza90UHjb_4RqTBz13y4lT14zCGqgUzHBX1hrqu2HE8Ta4&usqp=CAU"
              alt=""
            />
          </li>
        </div>
        <p className="card__body__price">$15</p>
      </div>
    </div>
  );
};

export default ProductCard;

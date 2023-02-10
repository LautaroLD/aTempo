import React, { useState, FC } from "react";
import { AiOutlineInstagram } from "react-icons/ai";
import "./instacard.sass";

interface Props {
  image: string;
}
const InstaCard: FC<Props> = ({ image }) => {
  return (
    <div className="instacard">
      <img src={image} alt="" className="instacard__img" />

      <div className="instacard__body">
        <i className="instacard__body__icon">
          <AiOutlineInstagram />
        </i>
        <p className="instacard__body__text">Mostrar</p>
      </div>
    </div>
  );
};

export default InstaCard;

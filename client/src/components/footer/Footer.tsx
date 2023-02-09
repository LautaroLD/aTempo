import React, { useState } from "react";
import { FaAngleDown, FaAngleUp, FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./footer.sass";

export default function Footer() {
  const [openProfile, setOpenProfile] = useState<boolean>(false);
  const [openHelp, setOpenHelp] = useState<boolean>(false);

  const openProfileFunction = (): void => {
    setOpenProfile(!openProfile);
  };
  const openHelpFunction = (): void => {
    setOpenHelp(!openHelp);
  };
  return (
    <section className="footer">
      <div className="footer__content service">
        <p className="service__title">Servicio al cliente</p>
        <p className="service__number">888-386-7568</p>
        <p className="service__days">De Lunes a viernes</p>
      </div>
      <div className="footer__content drop">
        <div className="drop__component">
          <p className="drop__component__title" onClick={openProfileFunction}>
            MI PERFIL
            {!openProfile ? (
              <FaAngleDown className="drop__icon" />
            ) : (
              <FaAngleUp className="drop__icon" />
            )}
          </p>
          <ul className="drop__component__list" hidden={!openProfile}>
            <li className="drop__component__list__item">
              <Link to={"/"}>Mis compras</Link>
            </li>
            <li className="drop__component__list__item">
              <Link to={"/"}>Mi lista de deseados</Link>
            </li>
            <li className="drop__component__list__item">
              <Link to={"/"}>Mis direcciones</Link>
            </li>
            <li className="drop__component__list__item">
              <Link to={"/"}>Mis valoraciones</Link>
            </li>
          </ul>
        </div>
        <div className="drop__component">
          <p className="drop__component__title" onClick={openHelpFunction}>
            AYUDA
            {!openHelp ? (
              <FaAngleDown className="drop__component__icon" />
            ) : (
              <FaAngleUp className="drop__component__icon" />
            )}
          </p>
          <ul className="drop__component__list" hidden={!openHelp}>
            <li className="drop__component__list__item">
              <Link to={"/"}>Preguntas frecuentes</Link>
            </li>
            <li className="drop__component__list__item">
              <Link to={"/"}>Quienes somos</Link>
            </li>
            <li className="drop__component__list__item">
              <Link to={"/"}>Soporte</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer__content social">
        <div>ATEMPO</div>
        <div className="social__component">
          <p className="social__component__text">Siguenos en </p>
          <FaInstagram className="social__component__icon instagram" />
          <FaFacebookF className="social__component__icon facebook" />
          <FaTwitter className="social__component__icon twitter" />
        </div>
      </div>
    </section>
  );
}

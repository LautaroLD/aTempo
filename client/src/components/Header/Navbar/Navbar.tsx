import React from "react";
import { BsXLg, BsHeart } from "react-icons/bs";
import { Link } from "react-router-dom";
import "./navbar.sass";
import { Icons } from "../../../assets/icons/icons";
import { FaRegUser, FaUser } from "react-icons/fa";

type Props = {
  openNavBar: boolean;
  openNavBarFunction: React.MouseEventHandler<SVGElement>;
  desktopScreen: boolean;
  isLogin: boolean;
};

export default function Navbar({ openNavBar, openNavBarFunction, desktopScreen, isLogin }: Props) {
  return (
    <nav hidden={!openNavBar && !desktopScreen} className="navbar">
      <div className="navbar__element">
        <div hidden={desktopScreen} className="navbar__element__top">
          <h4 className="navbar__element__top__title">NAVEGACIÓN</h4>
          <BsXLg className="navbar__element__top__closeIcon" onClick={openNavBarFunction} />
        </div>
        <div className="navbar__element__categories categories">
          <ul className="categories__list">
            <li className="categories__list__item">
              <Link to={"./"}>
                <img src={Icons.Ballet} alt="" />
                BALLET
              </Link>
            </li>
            <li className="categories__list__item">
              <Link to={"./"}>
                <img src={Icons.Tap} alt="" />
                TAP
              </Link>
            </li>
            <li className="categories__list__item">
              <Link to={"./"}>
                <img src={Icons.Jazz} alt="" />
                JAZZ
              </Link>
            </li>
            <li className="categories__list__item">
              <Link to={"./"}>
                <img src={Icons.Personaje} alt="" />
                PERSONAJE
              </Link>
            </li>
            <li className="categories__list__item">
              <Link to={"./"}>
                <img src={Icons.Ballroom} alt="" />
                BALLROOM
              </Link>
            </li>
            <li className="categories__list__item">
              <Link to={"./"}>
                <img src={Icons.Dansneakers} alt="" />
                DANSNEAKERS
              </Link>
            </li>
            <li className="categories__list__item">
              <Link to={"./"}>
                <img src={Icons.Moderno} alt="" />
                MODERNO
              </Link>
            </li>
            <li className="categories__list__item">
              <Link to={"./"}>
                <img src={Icons.Tango} alt="" />
                TANGO
              </Link>
            </li>
            <li className="categories__list__item">
              <Link to={"./"}>
                <img src={Icons.Outlet} alt="" />
                OUTLET
              </Link>
            </li>
          </ul>
        </div>
        <div hidden={desktopScreen} className="navbar__element__bottom bottom">
          <ul className="bottom__list">
            {isLogin && (
              <li className="bottom__list__item item">
                <Link className="item__link" to={"./"}>
                  <BsHeart className="item__link__icon" />
                  LISTA DE DESEADOS
                </Link>
              </li>
            )}
            <li className="bottom__list__item item">
              <Link className="item__link" to={isLogin ? "/profile" : "/login"}>
                {isLogin ? (
                  <>
                    <FaUser className="item__link__icon" />
                    JHON
                  </>
                ) : (
                  <>
                    <FaRegUser className="item__link__icon" />
                    MI CUENTA
                  </>
                )}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

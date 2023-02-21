import { MouseEventHandler } from "react";
import { Link } from "react-router-dom";
import { Icons } from "../../../assets/icons/icons";
import { BsXLg, BsHeart } from "react-icons/bs";
import { FaRegUser, FaUser } from "react-icons/fa";

type Props = {
  openNavBar: boolean;
  openNavBarFunction: MouseEventHandler<SVGElement>;
  desktopScreen: boolean;
  isLogin: boolean;
};

const menus = [
  { name: "BALLET", icon: Icons.Ballet, link: "./" },
  { name: "TAP", icon: Icons.Tap, link: "./" },
  { name: "JAZZ", icon: Icons.Jazz, link: "./" },
  { name: "PERSONAJE", icon: Icons.Personaje, link: "./" },
  { name: "BALLROOM", icon: Icons.Ballroom, link: "./" },
  { name: "DANSNEAKERS", icon: Icons.Dansneakers, link: "./" },
  { name: "MODERNO", icon: Icons.Moderno, link: "./" },
  { name: "TANGO", icon: Icons.Tango, link: "./" },
  { name: "OUTLET", icon: Icons.Outlet, link: "./" }
];

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
            {menus.map((menu, index) => {
              return (
                <li key={`menu-${index}`} className="categories__list__item">
                  <Link to={menu.link}>
                    <img src={menu.icon} alt="" />
                    {menu.name}
                  </Link>
                </li>
              );
            })}
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

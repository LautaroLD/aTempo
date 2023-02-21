import { MouseEventHandler } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setLogout } from "../../../app/state/authSlice";
import { AppStore } from "../../../app/store";
import { Icons } from "../../../assets/icons/icons";
import { BsXLg, BsHeart } from "react-icons/bs";
import { BiLogOutCircle } from "react-icons/bi";
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
  const user = useSelector((store: AppStore) => store.auth.user);
  const dispatch = useDispatch();

  const logout = (): void => {
    dispatch(setLogout());
  };

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
        <div hidden={desktopScreen} className="navbar__element__bottom">
          <ul className="bottom__list">
            {user.name && (
              <li className="bottom__list__item item">
                <Link className="item__link" to={"./"}>
                  <BsHeart className="item__link__icon" />
                  LISTA DE DESEADOS
                </Link>
              </li>
            )}
            <li className="bottom__list__item item">
              <Link className="item__link" to={user.name ? "/profile" : "/login"}>
                {user.name ? (
                  <>
                    <FaUser className="item__link__icon" />
                    {user.name} {user.lastName}
                  </>
                ) : (
                  <>
                    <FaRegUser className="item__link__icon" />
                    MI CUENTA
                  </>
                )}
              </Link>
            </li>
            {user.name && (
              <li className="bottom__list__item item">
                <Link className="item__link" to="/" onClick={logout}>
                  <BiLogOutCircle className="item__link__icon" />
                  SALIR
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

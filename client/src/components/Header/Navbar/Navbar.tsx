import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setLogout } from "../../../app/state/authSlice";
import { AppStore } from "../../../app/store";
import { Icons } from "../../../assets/icons/icons";
import { BsXLg, BsHeart } from "react-icons/bs";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { FaRegUser, FaUser } from "react-icons/fa";
import { Product } from "../../../models/Product";

type Props = {
  openNavBar: boolean;
  openNavBarFunction: any;
  desktopScreen: boolean;
};

const menus = [
  { name: "BALLET", icon: Icons.Ballet },
  { name: "TAP", icon: Icons.Tap },
  { name: "JAZZ", icon: Icons.Jazz },
  { name: "PERSONAJE", icon: Icons.Personaje },
  { name: "BALLROOM", icon: Icons.Ballroom },
  { name: "DANSNEAKERS", icon: Icons.Dansneakers },
  { name: "MODERNO", icon: Icons.Moderno },
  { name: "TANGO", icon: Icons.Tango },
  { name: "OUTLET", icon: Icons.Outlet }
];

export default function Navbar({ openNavBar, openNavBarFunction, desktopScreen }: Props) {
  const { user, token } = useSelector((store: AppStore) => store.auth);
  const dispatch = useDispatch();
  const { list } = useSelector((store: AppStore) => store.products);
  const navigate = useNavigate();
  const goToProducts = (categoryNav: string) => {
    const resultSearch: Product[] = new Array();
    list.forEach(element => {
      const productCategory = element.Categories;
      productCategory.forEach(category => {
        category.name.toLowerCase() === categoryNav.toLowerCase() && resultSearch.push(element);
      });
    });
    openNavBarFunction();
    navigate("/products", { state: { inputSearch: categoryNav, resultSearch: resultSearch } });
  };
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
                  <p className="item__text" onClick={() => goToProducts(menu.name)}>
                    <img src={menu.icon} alt="" />
                    {menu.name}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
        <div hidden={desktopScreen} className="navbar__element__bottom">
          <ul className="bottom__list">
            {token && !user.isAdmin && (
              <li className="bottom__list__item item">
                <Link className="item__link" to={"./"}>
                  <BsHeart className="item__link__icon" />
                  Lista de deseados
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
                    Mi cuenta
                  </>
                )}
              </Link>
            </li>
            {user.name && (
              <li className="bottom__list__item item">
                <Link className="item__link" to="/" onClick={logout}>
                  <AiOutlineCloseCircle className="item__link__icon" />
                  Salir
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

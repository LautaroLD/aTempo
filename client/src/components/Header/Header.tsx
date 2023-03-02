import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppStore } from "../../app/store";
import Navbar from "./Navbar/Navbar";
import FormSearch from "./FormSearch/FormSearch";
import UserDropMenu from "./UserDropMenu/UserDropMenu";
import { Icons } from "../../assets/icons/icons";
import { BiMenu, BiSearch } from "react-icons/bi";
import { BsHeart } from "react-icons/bs";
import ProductCartDropdown from "../ProductCartDropdown/ProductCartDropdown";
import { CartModel } from "../../models/Cart";

export default function Header() {
  const { user, token } = useSelector((store: AppStore) => store.auth);
  const UserCart: CartModel = useSelector((store: AppStore) => store.auth.user.Cart);

  const [isOpenSearch, setIsOpenSearch] = useState<boolean>(false);
  const [isOpenNavBar, setIsOpenNavBar] = useState<boolean>(false);
  const [isDesktopScreen, setIsDesktopScreen] = useState<boolean>(window.innerWidth >= 768);
  const [isOpenCartDropdown, setIsOpenCartDropdown] = useState<boolean>(false);
  const [userCartProducts, setUserCartProducts] = useState<number>(0);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    setIsOpenNavBar(false);
    setIsOpenCartDropdown(false);
  }, [pathname]);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setIsDesktopScreen(window.innerWidth >= 768);
    });
  }, []);

  useEffect(() => {
    setUserCartProducts(UserCart?.Products?.length);
  }, [UserCart]);

  if (isOpenNavBar && !isDesktopScreen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
  const openSearch = (): void => {
    setIsOpenSearch(!isOpenSearch);
  };
  const openNavBar = (): void => {
    setIsOpenNavBar(!isOpenNavBar);
  };

  return (
    <>
      <header className="header">
        <div className="header__containerLogo">
          <Link className="header__containerLogo__logo" to={"./"}>
            <img src={Icons.Logo} alt="Logo" />
          </Link>
        </div>
        <div hidden={!isOpenSearch && !isDesktopScreen} className="header__containerSearch">
          <FormSearch />
        </div>
        <div className="header__containerIcons">
          {isDesktopScreen && (
            <>
              {token && (
                <Link
                  hidden={user.isAdmin ? true : false}
                  className="header__containerIcons__fav"
                  to={"./"}
                >
                  <BsHeart className="header__containerIcons__item" />
                </Link>
              )}
              <UserDropMenu />
            </>
          )}
          <i hidden={isDesktopScreen} className="header__containerIcons__search">
            <BiSearch onClick={openSearch} className="header__containerIcons__item" />
          </i>
          {!user.isAdmin && (
            <i
              className="header__containerIcons__cart cart"
              onClick={() =>
                isDesktopScreen ? setIsOpenCartDropdown(!isOpenCartDropdown) : navigate("/cart")
              }
            >
              <div className="cart__number" id="cart-icon">
                {
                  user.Cart.Products? 
                    <p>+{ user.Cart.Products.length !== 0 ? user.Cart.Products.length : 0 }</p>
                    :
                    <p>0</p>
                }
              </div>
              <img src={Icons.Cart} alt="" className="cart__img" />
              {isOpenCartDropdown && <ProductCartDropdown />}
            </i>
          )}
          <i hidden={isDesktopScreen} className="header__containerIcons__menu">
            <BiMenu onClick={openNavBar} className="header__containerIcons__item" />
          </i>
        </div>
      </header>
      <Navbar
        openNavBar={isOpenNavBar}
        openNavBarFunction={openNavBar}
        desktopScreen={isDesktopScreen}
      />
    </>
  );
}

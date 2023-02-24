import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppStore } from "../../app/store";
import Navbar from "./Navbar/Navbar";
import FormSearch from "./FormSearch/FormSearch";
import UserDropMenu from "./UserDropMenu/UserDropMenu";
import { Icons } from "../../assets/icons/icons";
import { BiMenu, BiSearch } from "react-icons/bi";
import { BsHeart } from "react-icons/bs";
import ProductCartDropdown from "../ProductCartDropdown/ProductCartDropdown";

export default function Header() {
  const { user, token } = useSelector((store: AppStore) => store.auth);

  const [isOpenSearch, setIsOpenSearch] = useState<boolean>(false);
  const [isOpenNavBar, setIsOpenNavBar] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [isDesktopScreen, setIsDesktopScreen] = useState<boolean>(window.innerWidth >= 768);
  const [open, setOpen] = useState<boolean>(false);

  const { pathname } = useLocation();
  useEffect(() => {
    setIsOpenNavBar(false);
  }, [pathname]);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setIsDesktopScreen(window.innerWidth >= 768);
    });
  }, []);

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
        {open && <ProductCartDropdown />}
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
            <Link
              to={"/cart"}
              className="header__containerIcons__cart cart"
              onClick={() => setOpen(!open)}
            >
              <div className="cart__number">
                <p>+9</p>
              </div>
              <img src={Icons.Cart} alt="" className="cart__img" />
            </Link>
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

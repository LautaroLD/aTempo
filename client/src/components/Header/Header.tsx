import React, { useEffect, useState } from "react";
import { BiMenu, BiSearch } from "react-icons/bi";
import { Icons } from "../../assets/icons/icons";
import Navbar from "./Navbar/Navbar";
import { BsHeart } from "react-icons/bs";
import FormSearch from "./FormSearch/FormSearch";
import { Link, useLocation } from "react-router-dom";
import UserDropMenu from "./UserDropMenu/UserDropMenu";

export default function Header() {
  const [isOpenSearch, setIsOpenSearch] = useState<boolean>(false);
  const [isOpenNavBar, setIsOpenNavBar] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [isDesktopScreen, setIsDesktopScreen] = useState<boolean>(window.innerWidth >= 768);
  const { pathname } = useLocation()
  useEffect(() => {
    setIsOpenNavBar(false)
  }, [pathname])
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
  const openSearchFunction = (): void => {
    setIsOpenSearch(!isOpenSearch);
  };
  const openNavBarFunction = (): void => {
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
          {isDesktopScreen && <>
            <Link hidden={!isLogin} className="header__containerIcons__fav" to={"./"}>
              <BsHeart className="header__containerIcons__item" />
            </Link>
            <UserDropMenu isLogin={isLogin} setIsLogin={setIsLogin} />
          </>
          }
          <i hidden={isDesktopScreen} className="header__containerIcons__search">
            <BiSearch onClick={openSearchFunction} className="header__containerIcons__item" />
          </i>
          <Link to={"/cart"} className="header__containerIcons__cart cart">
            <div className="cart__number">
              <p>+9</p>
            </div>
            <img src={Icons.Cart} alt="" className="cart__img" />
          </Link>
          <i hidden={isDesktopScreen} className="header__containerIcons__menu">
            <BiMenu onClick={openNavBarFunction} className="header__containerIcons__item" />
          </i>
        </div>
      </header>
      <Navbar
        openNavBar={isOpenNavBar}
        openNavBarFunction={openNavBarFunction}
        desktopScreen={isDesktopScreen}
        isLogin={isLogin}
      />
    </>
  );
}

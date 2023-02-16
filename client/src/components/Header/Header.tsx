import React, { useEffect, useState } from "react";
import "./header.sass";
import { BiChevronDown, BiMenu, BiSearch } from "react-icons/bi";
import { Icons } from "../../assets/icons/icons";
import Navbar from "./Navbar/Navbar";
import { FaAngleDown, FaUser } from "react-icons/fa";
import { BsHeart } from "react-icons/bs";
import FormSearch from "./FormSearch/FormSearch";
import { AiOutlineShoppingCart } from "react-icons/ai";
export default function Header() {
  const [isOpenSearch, setIsOpenSearch] = useState<boolean>(false);
  const [isOpenNavBar, setIsOpenNavBar] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [isDesktopScreen, setIsDesktopScreen] = useState<boolean>(window.innerWidth >= 768);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setIsDesktopScreen(window.innerWidth >= 768);
    });
  }, []);

  if (isOpenNavBar && !isDesktopScreen) {
    document.querySelector("html").style.overflow = "hidden";
  } else {
    document.querySelector("html").style.overflow = "auto";
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
          <img className="header__containerLogo__logo" src={Icons.Logo} alt="Logo" />
        </div>
        <div hidden={!isOpenSearch && !isDesktopScreen} className="header__containerSearch">
          <FormSearch />
        </div>
        <div className="header__containerIcons">
          {isDesktopScreen && isLogin && (
            <i>
              <BsHeart className="header__containerIcons__item" />
            </i>
          )}
          {isDesktopScreen && (
            <p className="header__containerIcons__user">
              {isLogin ? (
                <>
                  <FaUser />
                  jhon
                  <BiChevronDown />
                </>
              ) : (
                <>
                  Mi cuenta
                  <FaAngleDown />
                </>
              )}
            </p>
          )}
          {!isDesktopScreen && (
            <i className="header__containerIcons__search">
              <BiSearch onClick={openSearchFunction} className="header__containerIcons__item" />
            </i>
          )}
          <i className="cart">
            <p className="cart__number"></p>{" "}
            <AiOutlineShoppingCart className="header__containerIcons__item" />
          </i>
          {!isDesktopScreen && (
            <i className="header__containerIcons__menu">
              <BiMenu onClick={openNavBarFunction} className="header__containerIcons__item" />
            </i>
          )}
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

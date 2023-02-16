import React, { useEffect, useState } from "react";
import { BiChevronDown, BiMenu, BiSearch } from "react-icons/bi";
import { Icons } from "../../assets/icons/icons";
import Navbar from "./Navbar/Navbar";
import { FaAngleDown, FaUser } from "react-icons/fa";
import { BsHeart, BsCart3 } from "react-icons/bs";
import FormSearch from "./FormSearch/FormSearch";
import { Link } from "react-router-dom";

import "../../styles/header.sass";

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
    document.body.style.overflow = "hidden"
  } else {
    document.body.style.overflow = "auto"
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
          {isDesktopScreen && isLogin && (
            <Link to={"./"}>
              <BsHeart className="header__containerIcons__item" />
            </Link>
          )}
          {isDesktopScreen && (
            <i className="header__containerIcons__user">
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
            </i>
          )}
          {!isDesktopScreen && (
            <i className="header__containerIcons__search">
              <BiSearch onClick={openSearchFunction} className="header__containerIcons__item" />
            </i>
          )}
          <Link to={"/cart"} className="cart">
            <div className="cart__number"><p>+9</p></div>
            <BsCart3 className="header__containerIcons__item" />
          </Link>
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

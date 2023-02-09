import React from "react";
import { Link } from "react-router-dom";
import "./NavStyle.sass";
export default function Navbar() {
  return (
    <>
      <div className="menu__container">
        <Link to="/">
          <a>
            <img src="src/assets/logo/LogoMobile.png" className="logo" />
          </a>
        </Link>
        <div className="menu__icons">
          <img src="src/assets/icons/Search.png" />
          <img src="src/assets/icons/Cart0.png" />
          <img src="src/assets/icons/Burger.png" />
        </div>
      </div>
      <ul className="burguer__container">
        <li>
          <img src="src/assets/icons/Ballet.png" className="icon" />
          <a href="#" className="link">
            DANZA
          </a>
        </li>
        <li>
          <img src="src/assets/icons/Tap.png" className="icon" />
          <a href="#">TAP</a>
        </li>
        <li>
          <img src="src/assets/icons/Jazz.png" className="icon" />
          <a href="#">JAZZ</a>
        </li>
        <li>
          <img src="src/assets/icons/Personaje.png" className="icon" /> <a href="#">PERSONAJE</a>
        </li>
        <li>
          <img src="src/assets/icons/Ballroom.png" className="icon" /> <a href="#">BALLROOM</a>
        </li>
        <li>
          <img src="src/assets/icons/Dancesneakers.png" className="icon" />{" "}
          <a href="#">DANSNEAKERS</a>
        </li>
        <li>
          <img src="src/assets/icons/Moderno.png" className="icon" /> <a href="#">MODERNO</a>
        </li>
        <li>
          <img src="src/assets/icons/Tango.png" className="icon" /> <a href="#">TANGO</a>
        </li>
        <li>
          <img src="src/assets/icons/Outlet.png" className="icon" /> <a href="#">OUTLET</a>
        </li>
      </ul>
    </>
  );
}

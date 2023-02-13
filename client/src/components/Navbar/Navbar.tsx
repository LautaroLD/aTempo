import { Link } from "react-router-dom";
import { Icons } from "../../assets/icons/icons";
import "./NavStyle.sass";
export default function Navbar() {
  return (
    <>
      <div className="menu__container">
        <Link to="/">
          <a>
            <img src={ Icons.Logo } className="logo" />
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
          <img src={ Icons.Ballet } className="icon" />
          <a href="#" className="link">
            DANZA
          </a>
        </li>
        <li>
          <img src={ Icons.Tap } className="icon" />
          <a href="#">TAP</a>
        </li>
        <li>
          <img src={ Icons.Jazz } className="icon" />
          <a href="#">JAZZ</a>
        </li>
        <li>
          <img src={ Icons.Personaje } className="icon" /> <a href="#">PERSONAJE</a>
        </li>
        <li>
          <img src={ Icons.Ballroom } className="icon" /> <a href="#">BALLROOM</a>
        </li>
        <li>
          <img src={ Icons.Dansneakers } className="icon" />{" "}
          <a href="#">DANSNEAKERS</a>
        </li>
        <li>
          <img src={ Icons.Moderno } className="icon" /> <a href="#">MODERNO</a>
        </li>
        <li>
          <img src={ Icons.Tango } className="icon" /> <a href="#">TANGO</a>
        </li>
        <li>
          <img src={ Icons.Outlet } className="icon" /> <a href="#">OUTLET</a>
        </li>
      </ul>
    </>
  );
}

import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return <div>
    <Link to ='/'>
      <a>
      <img src="/assets/logo/LogoMobile.png"/>
      </a>
    </Link>
  </div>;
}
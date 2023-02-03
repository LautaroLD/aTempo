import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from "../pages/Cart/Cart";
import Detail from "../pages/Detail/Detail";
import Home from "../pages/Home/Home";
import LogIn from "../pages/LogIn/LogIn";
import Products from "../pages/Products/Products";
import Profile from "../pages/Profile/Profile";
import SignUp from "../pages/SignUp/SignUp";

export default function AppRoute() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

import { lazy, Suspense } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { PrivateRoutes, PublicRoutes } from "../models/routes";
import { Roles } from "../models/roles";
import Cart from "../pages/Cart/Cart";
import Detail from "../pages/Detail/Detail";
import Home from "../pages/Home/Home";
import LogIn from "../pages/LogIn/LogIn";
import Products from "../pages/Products/Products";
import Profile from "../pages/Profile/Profile";
import Layout from "../utils/Layout";
import RoleGuard from "./guards/RoleGuard";

const renderLoader = () => <p>Loading Page</p>;
const AdminDashboard = lazy(() => import("../pages/Private/Admin/AdminDashboard/AdminDashboard"));
const SignUp = lazy(() => import("../pages/SignUp/SignUp"));

export default function AppRoute() {
  return (
    <Suspense fallback={renderLoader()}>
      <BrowserRouter>
        <Layout>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/detail" element={<Detail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<LogIn />} />
          <Route path={PublicRoutes.SIGNUP} element={<SignUp />} />
          <Route element={<RoleGuard rol={Roles.ADMIN} />}>
            <Route path={`${PrivateRoutes.ADMIN}/*`} element={<AdminDashboard />} />
          </Route>
        </Layout>
      </BrowserRouter>
    </Suspense>
  );
}

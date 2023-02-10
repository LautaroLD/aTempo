import { Navigate, Outlet } from "react-router-dom";
import { PublicRoutes } from "../../models/routes";

interface Props {
  privateValidation: boolean;
}

export const AuthGuard = ({ privateValidation }: Props) => {
  privateValidation ? <Outlet /> : <Navigate replace to={PublicRoutes.HOME} />;
};

export default AuthGuard;

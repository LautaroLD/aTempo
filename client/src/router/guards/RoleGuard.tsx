import { Navigate, Outlet } from "react-router-dom";
import { PublicRoutes } from "../../models/routes";

interface Props {
  rol: string;
}

function RoleGuard({ rol }: Props) {
  const userState = "user"; //useSelector((store: AppStore) => store.auth);
  return userState === rol ? <Outlet /> : <Navigate replace to={PublicRoutes.HOME} />;
}
export default RoleGuard;

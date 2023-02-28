import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Header from "../components/Header/Header";

interface Props {
  children: JSX.Element[] | JSX.Element;
}
function Layout({ children }: Props) {
  const [inAdmin, setInAdmin] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.split("/")[1] === "admin") {
      setInAdmin(true);
    } else {
      setInAdmin(false);
    }
  }, [location]);

  return (
    <>
      <Header />
      {children}
      {!inAdmin && <Footer />}
    </>
  );
}
export default Layout;

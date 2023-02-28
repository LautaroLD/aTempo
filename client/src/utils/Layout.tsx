import { useSelector } from "react-redux";
import { AppStore } from "../app/store";
import Footer from "../components/footer/Footer";
import Header from "../components/Header/Header";

interface Props {
  children: JSX.Element[] | JSX.Element;
}
function Layout({ children }: Props) {
  const { user } = useSelector((store: AppStore) => store.auth);
  return (
    <>
      <Header />
      {children}
      {!user.isAdmin && <Footer />}
    </>
  );
}
export default Layout;

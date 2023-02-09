import Footer from "../components/footer/Footer";
import Navbar from "../components/Navbar/Navbar";

interface Props {
  children: JSX.Element[] | JSX.Element;
}
function Layout({ children }: Props) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
export default Layout;

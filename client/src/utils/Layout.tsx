interface Props {
  children: JSX.Element[] | JSX.Element;
}
function Layout({ children }: Props) {
  return (
    <>
      <p>HEADER</p>
      {children}
      <p>FOOTER</p>
    </>
  );
}
export default Layout;

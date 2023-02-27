import { Link } from "react-router-dom";

export default function Offer() {
  const imgLink: string =
    "https://firebasestorage.googleapis.com/v0/b/c8t54pern.appspot.com/o/images%2Finitial%2Fbailarinas.webp?alt=media&token=d97beef1-631f-4bdb-a0a4-bd99d2024438";
  return (
    <section className="offer">
      <div className="title">
        <p className="title__text">20% OFF por compras mayor de 20 unidades del mismo zapato</p>
      </div>
      <div className="content">
        <img className="content__img" src={imgLink} alt="Ballet practice" />
        <div className="text-container">
          <p className="text-container__title">TODO EN BALLET</p>
          <p className="text-container__text">Las últimas tendencias.</p>
          <Link className="text-container__link" to={"./products"}>
            Ver productos
          </Link>
        </div>
      </div>
    </section>
  );
}

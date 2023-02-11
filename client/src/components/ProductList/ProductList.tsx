import React from "react";
import "./productlist.sass";
import ProductCard from "../ProductCarousel/ProductCard/ProductCard";
import { MdArrowForwardIos } from "react-icons/md";

const ProductList = () => {
  return (
    <div className="productlist">
      <p className="productlist__text">Inicio - Resultados: "zapato"</p>
      <p className="productlist__title">Resultados: "zapato"</p>
      <button className="productlist__btn">Definir filtros</button>
      <p className="productlist__text__pagination">1-24/74 Productos</p>
      <div className="productlist__card__group">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
      <div className="productlist__pagination">
        <button className="productlist__pagination__btn">1</button>
        <button className="productlist__pagination__btn">2</button>
        <button className="productlist__pagination__btn">3</button>
        <button className="productlist__pagination__btn">4</button>
        <button className="productlist__pagination__btn">
          <MdArrowForwardIos />
        </button>
      </div>
    </div>
  );
};

export default ProductList;

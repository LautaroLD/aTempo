import { useState } from "react";
import { ProductsInCart } from "../../../models/ProductsInCart";
import { TypeTagsEmun } from "../../../models/TypeTagsEmun";
import { Tags } from "../../Tags/Tags";
import { BsImageFill } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";

const colors = [
  { id: "456", name: "negro", value: "#000000" },
  { id: "457", name: "marron", value: "#D8BEAF" },
  { id: "458", name: "rojo", value: "#DF3A01" },
  { id: "459", name: "rosa", value: "#F5A9F2" },
  { id: "460", name: "naranja", value: "#FF8000" },
  { id: "461", name: "amarillo", value: "#FFFF00" }
];

const shoesLast = [
  { id: "10", name: "R", value: "R" },
  { id: "11", name: "A", value: "A" }
];

const sizes = [
  { id: "256", name: "negro", value: "17" },
  { id: "257", name: "marron", value: "17.5" },
  { id: "258", name: "rojo", value: "18" },
  { id: "259", name: "rosa", value: "18.5" },
  { id: "260", name: "naranja", value: "19" },
  { id: "261", name: "amarillo", value: "19.5" },
  { id: "262", name: "naranja", value: "20" },
  { id: "263", name: "amarillo", value: "20.5" },
  { id: "264", name: "naranja", value: "21" },
  { id: "265", name: "amarillo", value: "21.5" },
  { id: "266", name: "naranja", value: "22" },
  { id: "267", name: "amarillo", value: "22.5" }
];

const CreateProduct = () => {
  const [productPic, setProductPic] = useState<FileList>();
  const [addProduct, setAddProduct] = useState<ProductsInCart>({
    ProductId: 0,
    quantity: 0,
    color: "",
    size: "",
    last: ""
  });
  return (
    <div className="createProduct__container">
      <span className="createProduct__title">NUEVO PRODUCTO</span>
      <div className="createProduct__options">
        <div className="options__left__container">
          <p className="form__title">Titulo</p>
          <input type="text" />
          <p className="form__title">Stock</p>
          <input type="number" />
          <p className="form__title">Precio</p>
          <input type="text" />
          <p className="form__title">Categoria</p>
          <select name="categ" id="01">
            <option value="all">todas las categorias</option>
          </select>
          <p className="form__title">Marcas</p>
          <select name="categ" id="01">
            <option value="all">todas las marcas</option>
          </select>
        </div>
        <div className="options__right__container">
          <div className="addCategory__container">
            <p className="form__title">Categorias seleccionadas</p>
          </div>
          <p className="form__title">Horma</p>
          <Tags
            dataTag={shoesLast}
            type={TypeTagsEmun.shoeLast}
            addCart={addProduct}
            setAddCart={setAddProduct}
            title="Horma"
          />
          <p className="form__title">Talles</p>
          <Tags
            dataTag={sizes}
            type={TypeTagsEmun.sizes}
            addCart={addProduct}
            setAddCart={setAddProduct}
            multiSelect={true}
          />
        </div>
      </div>
      <div className="options__bottom_container">
        <p className="form__title">Colores</p>
        <Tags
          dataTag={colors}
          type={TypeTagsEmun.colors}
          addCart={addProduct}
          setAddCart={setAddProduct}
        />
        <p className="form__title">Imagenes</p>
        <div className="images__container">
          <div className="imgProd__container">
            <BsImageFill className="imgProd__icon" />
          </div>
          <div className="imgProd__container">
            <BsImageFill className="imgProd__icon" />
          </div>
          <div className="imgProd__container">
            <BsImageFill className="imgProd__icon" />
          </div>
          <div className="imgProd__container">
            <BsImageFill className="imgProd__icon" />
          </div>
          <div className="imgProd__container">
            <BsImageFill className="imgProd__icon" />
          </div>
          <div className="imgProd__container">
            <label className="imgProd__container">
              <div className="imgProd__button__text">
                <AiOutlinePlus /> Agregar <br /> Producto
              </div>
              <input
                id="dropzone-file"
                type="file"
                name="productPic"
                multiple
                onChange={e => setProductPic(e.target.files ? e.target.files : productPic)}
              />
            </label>
          </div>
        </div>
        <p className="form__title">Descripción</p>
        <textarea />
        <button>Guardar</button>
      </div>
    </div>
  );
};

export default CreateProduct;

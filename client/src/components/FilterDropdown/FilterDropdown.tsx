import React, { useState } from "react";
import "./filterdropdown.sass";
import { AiFillHeart, AiOutlineClose } from "react-icons/ai";
import { GiBabyFace } from "react-icons/gi";
import { IoMdMan } from "react-icons/io";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { BsCircleFill } from "react-icons/bs";

const mockup = [
  {
    id: 1,
    title: "Categoría",
    content: [
      { icon: `<GiBabyFace />`, name: "BALLET", color: null },
      { icon: `<IoMdMan />`, name: "JAZZ", color: null },
      { icon: `<IoMdMan />`, name: "PERSONAJE", color: null },
      { icon: `<IoMdMan />`, name: "DANSNEAKERS", color: null },
      { icon: `<IoMdMan />`, name: "BALLROOM", color: null },
      { icon: `<IoMdMan />`, name: "MODERNO", color: null },
      { icon: `<IoMdMan />`, name: "TANGO", color: null },
      { icon: `<IoMdMan />`, name: "OUTLET", color: null }
    ]
  },
  {
    id: 2,

    title: "Marcas",
    content: [
      { icon: null, name: "CAPEZIO", color: null },
      { icon: null, name: "SANSHA", color: null },
      { icon: null, name: "LaDuca", color: null },
      { icon: null, name: "BLOCH", color: null }
    ]
  },
  {
    id: 3,

    title: "Colores",
    content: [
      { color: "#000", name: "NEGRO", icon: null },
      { color: "#E42E2E", name: "ROJO", icon: null },
      { color: "#D8BEAF", name: "BEIGE", icon: null },
      { color: "#4B2417", name: "MARRÓN", icon: null }
    ]
  },
  {
    id: 4,

    title: "Edad",
    content: [
      { icon: `<GiBabyFace />`, name: "Niños", color: null },
      { icon: `<IoMdMan />`, name: "Adultos", color: null }
    ]
  },
  {
    id: 5,

    title: "Sexo",
    content: [
      { icon: `<GiBabyFace />`, name: "Unisex", color: null },
      { icon: `<IoMdMan />`, name: "Hombre", color: null },
      { icon: `<IoMdMan />`, name: "Mujer", color: null }
    ]
  },
  {
    id: 6,

    title: "Talles",
    content: [
      { icon: `<GiBabyFace />`, name: "Niños", color: null },
      { icon: `<IoMdMan />`, name: "Adultos", color: null }
    ]
  },
  {
    id: 7,

    title: "Orden",
    content: [
      { icon: null, name: "Relevante", color: null },
      { icon: null, name: "Más populares", color: null },
      { icon: null, name: "Nombre: A-Z", color: null },
      { icon: null, name: "Nombre: Z-A", color: null },
      { icon: null, name: "Precio: Alto a bajo", color: null },
      { icon: null, name: "Precio: Bajo a alto", color: null },
      { icon: null, name: "Puntuación más alta", color: null }
    ]
  }
];

const FilterDropdown = () => {
  const [show, setShow] = useState(null);
  const [close, setClose] = useState(false);
  const [selected, setSelected] = useState([]);

  const handleSelectedFilter = () => {
    try {
    } catch (error) {
      return error;
    }
  };

  const toggle = (i: any) => {
    try {
      if (show === i) {
        setShow(null);
      } else {
        return setShow(i);
      }
      return setShow(null);
    } catch (error) {
      return error;
    }
  };
  return (
    <div className="filterdropdown">
      <div className="filterdropdown__header">
        <p className="filterdropdown__header__text">Definir filtros y orden</p>
        <AiOutlineClose className="filterdropdown__header__close" onClick={() => setClose(true)} />
      </div>
      <div className="filterdropdown__items">
        {mockup.map(item => {
          return (
            <div className="filterdropdown__items__item" key={item.id}>
              <div className="filterdropdown__items__item__closed" onClick={() => toggle(item.id)}>
                <p className="filterdropdown__items__item__closed__text">{item.title}</p>
                {show === item.id ? (
                  <MdKeyboardArrowUp className="filterdropdown__items__item__closed__icon" />
                ) : (
                  <MdKeyboardArrowDown className="filterdropdown__items__item__closed__icon" />
                )}
              </div>

              {show === item.id &&
                item.content.map(e => {
                  const { color, icon, name } = e;
                  return (
                    <div className="filterdropdown__items__item__open">
                      {icon && <GiBabyFace className="filterdropdown__items__item__open__icon" />}
                      {color && (
                        <BsCircleFill
                          color={color}
                          className="filterdropdown__items__item__open__icon"
                        />
                      )}
                      <p className="filterdropdown__items__item__open__text">{name}</p>
                    </div>
                  );
                })}
            </div>
          );
        })}
      </div>
      <button className="filterdropdown__btn">Definir Filtros</button>
    </div>
  );
};

export default FilterDropdown;

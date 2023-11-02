import { MouseEvent, FC, Dispatch, SetStateAction } from "react";
import { ProductsInCart } from "../../models/ProductsInCart";
import { TypeTagsEmun } from "../../models/TypeTagsEmun";

interface Iprops {
  title?: string;
  dataTag: { id: string | number; name: string; value: string }[];
  type: TypeTagsEmun;
  addCart: ProductsInCart;
  setAddCart: Dispatch<SetStateAction<ProductsInCart>>;
  multiSelect?: boolean;
}

export const Tags: FC<Iprops> = ({ dataTag, type, addCart, setAddCart, multiSelect }) => {
  const handleClickSize = (event: MouseEvent) => {
    let style = event.currentTarget.className;
    let selectedOld = document.getElementsByClassName(`body__tag__${type}__selected`);

    if (multiSelect) {
      console.log(selectedOld);
      if (style.includes("selected")) return (event.currentTarget.className = `body__tag__${type}`);
      event.currentTarget.className = `${style} body__tag__${type}__selected`;
    } else {
      if (selectedOld.length > 0) selectedOld[0].className = `body__tag__${type}`;
      event.currentTarget.className = `${style} body__tag__${type}__selected`;
      setAddCart({ ...addCart, [type]: event.currentTarget.id });
    }
  };

  return (
    <div className="body__tag">
      {dataTag.map(data => {
        return type === "color" ? (
          <div
            key={`${data}-${data.id}`}
            id={data.id.toString()}
            onClick={handleClickSize}
            className={`body__tag__${type}`}
            style={{ backgroundColor: data.value }}
          />
        ) : (
          <div
            key={`${type}-${data.id}`}
            id={data.id.toString()}
            onClick={handleClickSize}
            className={`body__tag__${type}`}
          >
            {data.value}
          </div>
        );
      })}
    </div>
  );
};

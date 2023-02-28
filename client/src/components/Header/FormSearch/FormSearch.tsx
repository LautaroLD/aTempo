import { ChangeEvent, FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppStore } from "../../../app/store";
import { Product } from "../../../models/Product";

export default function FormSearch() {
  const [filter, setFilter] = useState<string>("");
  const [searchInput, setSearchInput] = useState<string>("");
  const { list } = useSelector((store: AppStore) => store.products);
  const navigate = useNavigate();
  const setFilterFunction = (event: ChangeEvent<HTMLSelectElement>): void => {
    setFilter(event.target.value);
  };
  const setSearchFunction = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchInput(event.target.value);
  };
  const submitSearch = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const inputSearch = searchInput.toLowerCase();
    const resultSearch: Product[] = new Array();
    list.forEach(element => {
      const product = element.name.toLowerCase();
      const productBrand = element.Brand.name;
      filter === ""
        ? product.includes(inputSearch) && resultSearch.push(element)
        : product.includes(inputSearch) && productBrand === filter && resultSearch.push(element);
    });
    navigate("/products", { state: { inputSearch: inputSearch, resultSearch: resultSearch } });
  };
  return (
    <form className="header__containerSearch__form" onSubmit={submitSearch}>
      <select
        id="select"
        className="header__containerSearch__form__filterInput"
        name="filter"
        title="filter"
        onChange={setFilterFunction}
        value={filter}
      >
        <option value="">Todas las marcas</option>
        <option value="Capezio">Capezio</option>
        <option value="Sansha">Sansha</option>
        <option value="LaDuca">LaDuca</option>
        <option value="Bloch">Bloch</option>
      </select>
      <input
        className="header__containerSearch__form__input"
        type="text"
        placeholder="¿Qué estás buscando?"
        onChange={setSearchFunction}
        value={searchInput}
        required
      />
    </form>
  );
}

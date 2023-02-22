import { useState } from "react";
import EditDirection from "../../components/ProfileComponents/EditDirection/EditDirection";
import EditPassword from "../../components/ProfileComponents/EditPassword/EditPassword";
import EditProfile from "../../components/ProfileComponents/EditProfile/EditProfile";

export default function Profile() {
  const [editProfile, setEditProfile] = useState<boolean>(false);
  const [editDirection, setEditDirection] = useState<boolean>(false);

  const [country, setCountry] = useState<string>("Argentina");
  const [state, setState] = useState<string>("Buenos Aires");
  const [city, setcity] = useState<string>("Lomas de Zamora");
  const [street, setStreet] = useState<string>("Hipolito Yrigoyen");
  const [number, setNumber] = useState<number>(9201);
  const [zipCode, setZipCode] = useState<number>(1832);
  return (
    <div className="profile">
      <button
        onClick={(): void => {
          setEditProfile(!editProfile);
          setEditDirection(false);
        }}
        className="profile__buttons"
      >
        Editar perfil
      </button>
      <button className="profile__buttons">Mis compras</button>
      <button
        onClick={(): void => {
          setEditProfile(false);
          setEditDirection(!editDirection);
        }}
        className="profile__buttons"
      >
        Mi dirección
      </button>
      <button className="profile__buttons">Mi lista de deseados</button>
      <button className="profile__buttons">Mis valoraciones</button>
      {editProfile && (
        <>
          <EditProfile />
          <EditPassword />
        </>
      )}
      {editDirection && (
        <EditDirection
          country={country}
          state={state}
          city={city}
          street={street}
          number={number}
          zipCode={zipCode}
        />
      )}
    </div>
  );
}

import { useState } from "react";
import EditPassword from "../../components/ProfileComponents/EditPassword/EditPassword";
import EditProfile from "../../components/ProfileComponents/EditProfile/EditProfile";

export default function Profile() {
  const [editProfile, setEditProfile] = useState<boolean>(false);

  const [email, setEmail] = useState<string>("jonathan@hotmail.com");
  const [name, setName] = useState<string>("Jonathan");
  const [surname, setSurname] = useState<string>("Poblet");
  const [document, setDocument] = useState<number>(15212525);
  const [birthdate, setBirthdate] = useState<Date>(new Date());
  return (
    <div className="profile">
      <button
        onClick={(): void => {
          setEditProfile(!editProfile);
        }}
        className="profile__buttons"
      >
        Editar perfil
      </button>
      <button className="profile__buttons">Mis compras</button>
      <button className="profile__buttons">Mi dirección</button>
      <button className="profile__buttons">Mi lista de deseados</button>
      <button className="profile__buttons">Mis valoraciones</button>
      {editProfile && (
        <>
          <EditProfile
            email={email}
            name={name}
            surname={surname}
            document={document}
            birthdate={birthdate}
          />
          <EditPassword />
        </>
      )}
    </div>
  );
}

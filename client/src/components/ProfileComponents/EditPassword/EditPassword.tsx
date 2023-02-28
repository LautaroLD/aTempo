import { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";
import { FaEye } from "react-icons/fa";
import { useSelector } from "react-redux";
import { User } from "../../../models/User";
import { AppDispatch, AppStore } from "../../../app/store";
import { updateUserPassword } from "../../../app/state/authSlice";
import { ChangePasswords } from "../../../models/Password";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

YupPassword(Yup);

const changePasswordSchema = Yup.object().shape({
  password: Yup.string().required("Contraseña requerida"),
  newPassword: Yup.string()
    .required("Contraseña requerida")
    .min(8, "Contraseña minimo 8 caracteres")
    .minLowercase(1, "Contraseña debe contener minimo 1 caracter minuscula")
    .minUppercase(1, "Contraseña debe contener minimo 1 caracter mayuscula")
    .minNumbers(1, "Contraseña debe contener minimo 1 caracter numerico")
    .minSymbols(1, "Contraseña debe contener minimo 1 caracter simbolo"),
  newPasswordConfirm: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Contraseñas deben coincidir")
    .required("Confirmación requerida")
});

export default function EditPassword() {
  const UserInformation: User = useSelector((store: AppStore) => store.auth.user);
  const dispatch = useDispatch<AppDispatch>();
  const [seePassword, setSeePassword] = useState<boolean>(false);
  const [seeNewPassword, setSeeNewPassword] = useState<boolean>(false);
  const CHANGE__PASSWORD__FORM__INITIAL__VALUES: ChangePasswords = {
    password: "",
    newPassword: "",
    newPasswordConfirm: ""
  };
  const handleSubmitFormPassword = async (values: ChangePasswords, email: string) => {
    const requestData = {
      email,
      password: values.password,
      newPassword: values.newPassword,
      id: UserInformation.id
    };
    const requestEditPassword = await dispatch(updateUserPassword(requestData));
    console.log(requestEditPassword);
    if (requestEditPassword === "Cambio de contraseña exitoso") {
      toast.success("Contraseña actualizada", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
      });
    } else {
      toast.error(requestEditPassword.toString(), {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
      });
    }
  };
  return (
    <div className="profile__password">
      <h1 className="profile__password__title">CAMBIAR CONTRASEÑA</h1>
      <Formik
        initialValues={CHANGE__PASSWORD__FORM__INITIAL__VALUES}
        validationSchema={changePasswordSchema}
        onSubmit={values => handleSubmitFormPassword(values, UserInformation.email)}
      >
        {({ errors, touched }) => (
          <Form className="profile__password__form">
            <label className="profile__password__form__label" htmlFor="password">
              Contraseña Actual
            </label>
            <div className="profile__password__form__container">
              <Field
                className="profile__password__form__container__field"
                name="password"
                placeholder="Contraseña Actual"
                type={seePassword ? "text" : "password"}
              />
              <FaEye
                onClick={(): void => {
                  setSeePassword(!seePassword);
                }}
                className="profile__password__form__container__icon"
              />
            </div>
            {errors.password && touched.password ? (
              <div className="profile__password__form__container__error">{errors.password}</div>
            ) : null}
            <label className="profile__password__form__label" htmlFor="newPassword">
              Nueva Contraseña
            </label>
            <div className="profile__password__form__container">
              <Field
                className="profile__password__form__container__field"
                name="newPassword"
                placeholder="Nueva Contraseña"
                type={seeNewPassword ? "text" : "password"}
              />
              <FaEye
                onClick={(): void => {
                  setSeeNewPassword(!seeNewPassword);
                }}
                className="profile__password__form__container__icon"
              />
            </div>
            {errors.newPassword && touched.newPassword ? (
              <div className="profile__password__form__container__error">{errors.newPassword}</div>
            ) : null}
            <label className="profile__password__form__label" htmlFor="newPasswordConfirm">
              Confirmar Contraseña
            </label>
            <div className="profile__password__form__container">
              <Field
                className="profile__password__form__container__field"
                name="newPasswordConfirm"
                placeholder="Confirmar Contraseña"
                type={seeNewPassword ? "text" : "password"}
              />
              <FaEye
                onClick={(): void => {
                  setSeeNewPassword(!seeNewPassword);
                }}
                className="profile__password__form__container__icon"
              />
            </div>
            {errors.newPasswordConfirm && touched.newPasswordConfirm ? (
              <div className="profile__password__form__container__error">
                {errors.newPasswordConfirm}
              </div>
            ) : null}
            s
            <button className="profile__password__button" type="submit">
              Guardar
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

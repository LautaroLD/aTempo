import { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { FaEye } from "react-icons/fa";
import { BiCheckbox, BiCheckboxChecked } from "react-icons/bi";

import "./signup.sass";

type SignUpFormValues = {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const signUpSchema = Yup.object().shape({
  nombre: Yup.string()
    .min(3, "Nombre minimo 3 caracteres")
    .max(20, "Nombre maximo 20 caracteres")
    .required("Nombre requerido"),
  apellido: Yup.string()
    .min(3, "Apellido minimo 3 caracteres")
    .max(20, "Apellido maximo 20 caracteres")
    .required("Apellido requerido"),
  email: Yup.string().email("Email invalido").required("Email requerido"),
  password: Yup.string().min(6, "Contraseña minimo 6 caracteres").required("Contraseña requerida"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Contraseñas deben coincidir")
    .required("Confirmación requerida")
});

export default function SignUp() {
  const [remember, setRemember] = useState<boolean>(false);
  const INITIAL__VALUES__SIGNUP__FORM: SignUpFormValues = {
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    confirmPassword: ""
  };

  return (
    <div className="container__signup">
      <div className="signup">
        <h1 className="signup__title">ATEMPO</h1>
        <h4 className="signup__subtitle">Ingresa tus datos para registrarte</h4>
        <Formik
          initialValues={INITIAL__VALUES__SIGNUP__FORM}
          validationSchema={signUpSchema}
          onSubmit={values => console.log(values)}
        >
          {({ errors, touched }) => (
            <Form className="signup__form">
              <Field className="signup__form__field" name="nombre" placeholder="Nombre" />
              {errors.nombre && touched.nombre ? (
                <div className="signup__form__error">{errors.nombre}</div>
              ) : null}

              <Field className="signup__form__field" name="apellido" placeholder="Apellido" />
              {errors.apellido && touched.apellido ? (
                <div className="signup__form__error">{errors.apellido}</div>
              ) : null}

              <Field className="signup__form__field" name="email" placeholder="E-mail" />
              {errors.email && touched.email ? (
                <div className="signup__form__error">{errors.email}</div>
              ) : null}

              <div className="signup__form__password">
                <Field
                  className="signup__form__password__field"
                  name="password"
                  placeholder="Contraseña"
                />
                <FaEye className="signup__form__password__eye" />
              </div>
              {errors.password && touched.password ? (
                <div className="signup__form__error">{errors.password}</div>
              ) : null}

              <div className="signup__form__password">
                <Field
                  className="signup__form__password__field"
                  name="confirmPassword"
                  placeholder="Confirmar Contraseña"
                />
                <FaEye className="signup__form__password__eye" />
              </div>
              {errors.confirmPassword && touched.confirmPassword ? (
                <div className="signup__form__error">{errors.confirmPassword}</div>
              ) : null}

              <div className="signup__form__remember">
                <div className="signup__form__remember__container">
                  {remember ? (
                    <BiCheckboxChecked className="signup__form__remember__container__check" />
                  ) : (
                    <BiCheckbox className="signup__form__remember__container__check" />
                  )}
                  <p className="signup__form__remember__container__text">
                    Deseo recibir noticias y promociones de la marca
                  </p>
                </div>
              </div>

              <button className="signup__form__entersession" type="submit">
                Registrarme
              </button>
            </Form>
          )}
        </Formik>
      </div>

      <div className="benefits__signup">
        <h2 className="benefits__signup__title">Tu nueva cuenta</h2>
        <h3 className="benefits__signup__subtitle">Te brinda beneficios únicos:</h3>
        <div className="benefits__signup__list">
          <ul className="benefits__signup__list__ul">
            <li className="benefits__signup__list__ul__item">
              Agregar productos a la lista de deseados
            </li>
            <li className="benefits__signup__list__ul__item">Guardar tus direcciones</li>
            <li className="benefits__signup__list__ul__item">Valorar productos</li>
            <li className="benefits__signup__list__ul__item">
              Te recordamos el carrito de compras
            </li>
            <li className="benefits__signup__list__ul__item">Futuras compras más rápidas</li>
          </ul>
        </div>
      </div>

      <div className="linklogin">
        <h2 className="linklogin__title">Inicia Sesión</h2>
        <p className="linklogin__paragraph">Si ya tienes cuenta puedes iniciar sesión</p>
        <Link to="/login" className="linklogin__button">
          Iniciar Sesión
        </Link>
      </div>
    </div>
  );
}

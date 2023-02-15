import { useState } from "react";
import { Formik, Form, Field } from "formik";
import { BiCheckbox, BiCheckboxChecked } from "react-icons/bi";
import * as Yup from "yup";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import './editprofile.sass';

type UserInformation = {
    email: string;
    name: string;
    surname: string;
    document?: number;
    birthdate?: Date | string
};

const userInformationSchema = Yup.object().shape({
    email: Yup.string().email("Email invalido").required("Email requerido"),
    name: Yup.string()
      .min(3, "Nombre minimo 3 caracteres")
      .max(20, "Nombre maximo 20 caracteres")
      .required("Nombre requerido"),
    surname: Yup.string()
      .min(3, "Apellido minimo 3 caracteres")
      .max(20, "Apellido maximo 20 caracteres")
      .required("Apellido requerido"),
    document: Yup.string().min(6, "Contraseña minimo 6 caracteres").required("Contraseña requerida"),
  });

export default function EditProfile({email,name,surname,document,birthdate}: UserInformation) {
    const [notifications, setNotifications] = useState<boolean>(false);
    const [date,setDate] = useState<Date>(new Date());

    const USER__INFORMATION__VALUES__FORM:UserInformation = {
        email: email,
        name: name,
        surname: surname,
        document: document || 0,
        birthdate: birthdate || new Date()
    }
    return (
        <div className="profile__information">
            <h1 className="profile__information__title">DATOS DE USUARIO</h1>
            <Formik
            initialValues={ USER__INFORMATION__VALUES__FORM }
            validationSchema={ userInformationSchema }
            onSubmit={values => {
                values.birthdate = date
                const updatedValues: UserInformation = {
                    email : values.email,
                    name : values.name,
                    surname : values.surname,
                    document : values.document,
                    birthdate : values.birthdate.toLocaleDateString()
                }
                console.log(updatedValues)
            }}
            >
            {({ errors, touched }) => (
                <Form className="profile__information__form">
                <label className="profile__information__form__label" htmlFor="email">Email</label>
                <Field className="profile__information__form__field profile__information__form__field__onlyread" readOnly name="email" placeholder="E-mail" />
                {errors.email && touched.email ? (
                    <div className="profile__information__form__error">{errors.email}</div>
                ) : null}

                <label className="profile__information__form__label" htmlFor="name">Nombre</label>
                <Field className="profile__information__form__field" name="name" placeholder="Nombre" />
                {errors.name && touched.name ? (
                    <div className="profile__information__form__error">{errors.name}</div>
                ) : null}

                <label className="profile__information__form__label" htmlFor="surname">Apellido</label>
                <Field className="profile__information__form__field" name="surname" placeholder="Apellido" />
                {errors.surname && touched.surname ? (
                    <div className="profile__information__form__error">{errors.surname}</div>
                ) : null}

                <label className="profile__information__form__label" htmlFor="document">Documento</label>
                <Field className="profile__information__form__field" name="document" placeholder="Documento" />
                {errors.document && touched.document ? (
                    <div className="profile__information__form__error">{errors.document}</div>
                ) : null}

                <label className="profile__information__form__label" htmlFor="fechaDeNacimiento">Fecha de Nacimiento</label>
                <DatePicker className="profile__information__form__datepicker" selected={ date } onChange={(date) => {
                    if(date) {
                        setDate(date);
                    }
                }}/>
                
                <h2 className="profile__information__form__subtitle">NOTIFICACIONES</h2>

                <div className="profile__information__form__remember">
                    <div className="profile__information__form__remember__container">
                    {notifications ? (
                        <BiCheckboxChecked onClick={() : void => {
                            setNotifications(!notifications)
                        }} className="profile__information__form__remember__container__check" />
                    ) : (
                        <BiCheckbox onClick={() : void => {
                            setNotifications(!notifications)
                        }} className="profile__information__form__remember__container__check" />
                    )}
                    <p className="profile__information__form__remember__container__text">
                        Deseo recibir noticias y promociones de la marca
                    </p>
                    </div>
                </div> 
                
                <button className="profile__information__form__entersession" type="submit">
                    Guardar
                </button>
                </Form>
            )}
            </Formik>
        </div>
    )
}

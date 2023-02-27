import { useState } from "react";
import { AppDispatch, AppStore } from "../../../app/store";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { updateUserDirection, postUserDirection } from "../../../app/state/authSlice";
import { User, UserDirection } from "../../../models/User";
import { toast } from "react-toastify";
import { BiCheckbox, BiCheckboxChecked } from "react-icons/bi";

const userInformationSchema = Yup.object().shape({
  country: Yup.string().required("País requerido"),
  state: Yup.string().required("Provincia requerida"),
  city: Yup.string().required("Barrio requerido"),
  street: Yup.string().required("Calle requerida"),
  number: Yup.number().required("Número de puerta requerido"),
  zipCode: Yup.number().required("Código Postal requerido")
});

type DirectionProps = {
  mode: string;
};

export default function EditDirection({ mode }: DirectionProps) {
  const dispatch = useDispatch<AppDispatch>();
  const UserInformation: User = useSelector((store: AppStore) => store.auth.user);

  const [agreeTerms, setAgreeTerms] = useState<boolean>(false);

  const USER__DIRECTION__VALUES__FORM: UserDirection = {
    id: UserInformation.addresses?.id,
    userId: UserInformation.id,
    country: UserInformation.addresses?.country,
    state: UserInformation.addresses?.state,
    city: UserInformation.addresses?.city,
    street: UserInformation.addresses?.street,
    number: UserInformation.addresses?.number,
    zipCode: UserInformation.addresses?.zipCode
  };

  const handleFormUserDirection = async (UserDirection: UserDirection) => {
    if (!UserInformation.addresses?.id) {
      const createUserDirection: boolean | string = await dispatch(
        postUserDirection(UserDirection)
      );
      if (createUserDirection) {
        toast.success("Dirección actualizada", {
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
        toast.error(createUserDirection.toString(), {
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
    } else {
      const changeUserDirection: boolean | string = await dispatch(
        updateUserDirection(UserDirection)
      );
      if (changeUserDirection) {
        toast.success("Dirección actualizada", {
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
        toast.error(changeUserDirection.toString(), {
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
    }
  };
  return (
    <div className="profile__direction">
      <h1 className="profile__direction__title">DIRECCIÓN</h1>
      <Formik
        initialValues={USER__DIRECTION__VALUES__FORM}
        validationSchema={userInformationSchema}
        onSubmit={async values => {
          await handleFormUserDirection(values);
        }}
      >
        {({ errors, touched }) => (
          <Form className="profile__direction__form">
            <label className="profile__direction__form__label" htmlFor="country">
              País
            </label>
            <Field className="profile__direction__form__field" name="country" placeholder="País" />
            {errors.country && touched.country ? (
              <div className="profile__direction__form__error">{errors.country}</div>
            ) : null}

            <label className="profile__direction__form__label" htmlFor="state">
              Departamento/Provincia
            </label>
            <Field
              className="profile__direction__form__field"
              name="state"
              placeholder="Provincia"
            />
            {errors.state && touched.state ? (
              <div className="profile__direction__form__error">{errors.state}</div>
            ) : null}

            <label className="profile__direction__form__label" htmlFor="city">
              Barrio
            </label>
            <Field className="profile__direction__form__field" name="city" placeholder="Barrio" />
            {errors.city && touched.city ? (
              <div className="profile__direction__form__error">{errors.city}</div>
            ) : null}

            <label className="profile__direction__form__label" htmlFor="street">
              Calle
            </label>
            <Field className="profile__direction__form__field" name="street" placeholder="Calle" />
            {errors.street && touched.street ? (
              <div className="profile__direction__form__error">{errors.street}</div>
            ) : null}

            <label className="profile__direction__form__label" htmlFor="number">
              Número de puerta
            </label>
            <Field
              className="profile__direction__form__field"
              name="number"
              placeholder="Número de puerta"
            />
            {errors.number && touched.number ? (
              <div className="profile__direction__form__error">{errors.number}</div>
            ) : null}

            <label className="profile__direction__form__label" htmlFor="zipCode">
              Código Postal
            </label>
            <Field
              className="profile__direction__form__field"
              name="zipCode"
              placeholder="Código Postal"
            />
            {errors.zipCode && touched.zipCode ? (
              <div className="profile__direction__form__error">{errors.zipCode}</div>
            ) : null}

            {mode === "cart" && (
              <div className="profile__direction__form__agreeTerms">
                <div className="profile__direction__form__agreeTerms__container">
                  {agreeTerms ? (
                    <BiCheckboxChecked
                      onClick={(): void => {
                        setAgreeTerms(!agreeTerms);
                      }}
                      className="profile__direction__form__agreeTerms__container__check"
                    />
                  ) : (
                    <BiCheckbox
                      onClick={(): void => {
                        setAgreeTerms(!agreeTerms);
                      }}
                      className="profile__direction__form__agreeTerms__container__check"
                    />
                  )}
                  <p className="profile__direction__form__agreeTerms__container__text">
                    Estoy de acuerdo con términos y condiciones
                  </p>
                </div>
              </div>
            )}

            <button className="profile__direction__form__save" type="submit">
              Guardar
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

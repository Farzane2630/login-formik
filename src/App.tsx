import { ErrorMessage, Field, Form, Formik } from 'formik'
import './App.scss'
import React from 'react'
import * as Yup from "yup"

interface formValues {
  name: string
  email: string
  password: string
}

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(5, "name must be more than 5 and less than 15 letters")
    .max(15, "name must be more than 5 and less than 15 letters")
    .required('Required'),
  email: Yup.string()
    .email('Invalid email!')
    .min(9, "email must be more than 9 letters")
    .required('Required'),
  password: Yup.string()
    .min(5, "name must be more than 5 and less than 15 letters")
    .max(15, "name must be more than 5 and less than 15 letters")
    .required('Required')
    .matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,15}$/,
      "Invalid password. Please use digits, lowercase letters, uppercase letters, and special characters.")
})

export const App: React.FC<{}> = () => {

  const initialValues: formValues = { email: '', name: '', password: "" }

  return (
    <div className='body_wrapper'>
      <div className="form_wrapper">
        <div className="form">
          <h1 className="title">
            Create an account
          </h1>
          <p className="subtitle">
            Sign up now and unlock exclusive access!
          </p>
          <Formik
            initialValues={initialValues}
            onSubmit={(values: formValues, { setSubmitting }) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 400);
            }}
            validationSchema={validationSchema}
          // validate={values => {
          //   const errors: { name?: string, email?: string, password?: string } = {}

          //   if (!values.name) {
          //     errors.name = "Required"
          //   } else if (values.name.length < 3 || values.name.length > 15) {
          //     errors.name = "name must be more than 3 and less than 15 letters"
          //   }
          //   if (!values.password) {
          //     errors.password = "Required"
          //   } else if (values.password.length < 8 || values.password.length > 15) {
          //     errors.password = "password must be more than 8 and less than 15 letters"
          //   }

          //   if (!values.email) {
          //     errors.email = "Required"
          //   } else if (
          //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          //   ) {
          //     errors.email = 'Invalid email address';
          //   }

          //   return errors;
          // }}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form className='form_parent'>
                <label className='lable' htmlFor="name">Your name</label>
                <ErrorMessage className="error_message" name="name" component="p" />
                <Field type="text" name='name' placeholder='First Last' className={`name ${errors.name && touched.name && 'error'}`} />
                <label className='lable' htmlFor="email">Email</label>
                <ErrorMessage className="error_message" name="email" component="p" />
                <Field type="text" name='email' placeholder='you@email.com' className={`email ${errors.email && touched.email && 'error'}`} />
                <label className='lable' htmlFor="password">Password</label>
                <ErrorMessage className="error_message" name="password" component="p" />
                <Field type="password" name='password' placeholder='⚫⚫⚫⚫⚫⚫⚫⚫' className={`password ${errors.password && touched.password && 'error'}`} />

                <button className="create_account" type='submit' disabled={isSubmitting}>
                  Create Account
                </button>
                <button type='button' className="log_in">
                  Log in
                </button>
              </Form>
            )
            }
          </Formik>
        </div>
        <div className="img_wrapper">
          <img src="src/assets/pic.png" className='img' alt="img" />
        </div>
      </div>

    </div>
  )
}


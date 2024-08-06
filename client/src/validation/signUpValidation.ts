import * as Yup from 'yup'

export const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    otp: Yup.string().matches(/^\d{4}$/, 'OTP must be exactly 4 digits').required('OTP is required'),
    password: Yup.string()
      .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, 'Password must be at least 6 characters and include both letters and numbers')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Confirm Password is required'),
  });
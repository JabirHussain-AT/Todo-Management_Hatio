import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FormValues } from '../../interface/SignUpFormValues';
import axios from 'axios';
import { validationSchema } from '../../validation/signUpValidation';
import { BACKEND_URL } from '../../constants/constants';
import { config } from '../../constants/config';


const SignUp: React.FC = () => {

  const [ isVerified , setIsVerified ] = useState<boolean>(false)

  const initialValues: FormValues = {
    name: '',
    email: '',
    otp: '',
    password: '',
    confirmPassword: '',
  };

  const handleSubmit = (values: FormValues, { setSubmitting }: any) => {
    // Here you would typically submit the form data to your backend
    if( !isVerified ){
        alert('email not verified ')
        return
    }
    console.log(values);
    setSubmitting(false);
  };

  
  //email verification api ( here we are sending req for OTP )
  const handleVerifyEmail = async (email: string) => {

    const result = await axios.post(`${BACKEND_URL}/api/send-otp`, { email },config)

    console.log( result ,'result is this =------------------=================-')
  };

  return (
    <div className='w-full min-h-screen flex justify-center items-center border-b-4 border-black rounded-md'>
      <div className='border rounded-md border-b-2 p-8'>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, isValid, dirty, values }) => (
            <Form>
              <div className='mb-4'>
                <label htmlFor='name' className='block mb-2'>Name</label>
                <Field type='text' name='name' className='w-full p-2 border rounded' />
                <ErrorMessage name='name' component='div' className='text-red-500' />
              </div>

              <div className='mb-4'>
                <label htmlFor='email' className='block mb-2'>Email</label>
                <div className='flex items-center'>
                  <Field type='email' name='email' className='w-full p-2 border rounded' />
                  <button
                    type='button'
                    className='ml-2 bg-blue-500 text-white p-2 rounded'
                    onClick={() => handleVerifyEmail(values.email)}
                  >
                    Verify
                  </button>
                </div>
                <ErrorMessage name='email' component='div' className='text-red-500' />
              </div>

              <div className='mb-4'>
                <label htmlFor='otp' className='block mb-2'>OTP (4 digits)</label>
                <Field type='text' name='otp' className='w-full p-2 border rounded' />
                <ErrorMessage name='otp' component='div' className='text-red-500' />
              </div>

              <div className='mb-4'>
                <label htmlFor='password' className='block mb-2'>Password (6+ characters, letters and numbers)</label>
                <Field type='password' name='password' className='w-full p-2 border rounded' />
                <ErrorMessage name='password' component='div' className='text-red-500' />
              </div>

              <div className='mb-4'>
                <label htmlFor='confirmPassword' className='block mb-2'>Confirm Password</label>
                <Field type='password' name='confirmPassword' className='w-full p-2 border rounded' />
                <ErrorMessage name='confirmPassword' component='div' className='text-red-500' />
              </div>

              <button
                type='submit'
                className='w-full bg-blue-500 text-white p-2 rounded'
                // disabled={isSubmitting || !isValid || !dirty}
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignUp;

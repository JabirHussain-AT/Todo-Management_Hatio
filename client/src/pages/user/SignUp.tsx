import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormValues } from "../../interface/SignUpFormValues";
import axios from "axios";
import { validationSchema } from "../../validation/signUpValidation";
import { BACKEND_URL } from "../../constants/constants";
import { config } from "../../constants/config";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContextFun";

const SignUp: React.FC = () => {
  const navigate = useNavigate()
  const { checkAuth } = useAuth();

  useEffect(()=>{
    checkAuth()
  },[axios])
  const [isVerifyButtonDisabled, setIsVerifyButtonDisabled] =
    useState<boolean>(false);

  const initialValues: FormValues = {
    name: "",
    email: "",
    otp: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = async (values: FormValues, { setSubmitting }: any) => {
    // Here you would typically submit the form data to your backend
    const result = await axios.post(
      `${BACKEND_URL}/api/auth/sign-up`,
      values,
      config
    );
    if (result?.data?.success) {
      toast.success("signup completed");
      navigate('/home');
    } else {
      toast.error("otp is not valid");
    }
  };

  //email verification api ( here we are sending req for OTP )
  const handleVerifyEmail = async (email: string) => {
    const result = await axios.post(
      `${BACKEND_URL}/api/auth/send-otp`,
      { email },
      config
    );
    //otp sent successfull

    if (result?.data?.success) {
      toast.success("otp sent successfully ✅");
      toast('otp is valid for 5 minutes 🕐',{
        duration : 8000
      })

      setIsVerifyButtonDisabled(true);

      setTimeout(() => {
        setIsVerifyButtonDisabled(false);
      }, 1000 * 60 * 5);
    } else {
      toast.error("Issue in sending otp , Try Later");
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center border-b-4 border-black rounded-md">
      <div className="border rounded-md border-b-2 p-8">
        <div className="flex justify-center mb-10 font-semibold font-serif">
          <h1 className="transform animate-pulse text-xl text-blue-700" >WelCome to Todo Management</h1>
        </div>
        <h1 className="underline mb-3 font-sans">Sign Up to the Application </h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, isValid, dirty, values }) => (
            <Form>
              <div className="mb-4">
                <label htmlFor="name" className="block mb-2">
                  Name
                </label>
                <Field
                  type="text"
                  name="name"
                  className="w-full p-2 border rounded"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block mb-2">
                  Email
                </label>
                <div className="flex items-center">
                  <Field
                    type="email"
                    name="email"
                    className="w-full p-2 border rounded"
                  />
                  <button
                    type="button"
                    className={`ml-2 text-white p-2 rounded ${
                      isVerifyButtonDisabled || !values.email
                        ? "bg-gray-500 cursor-not-allowed"
                        : "bg-blue-500 cursor-pointer hover:scale-105"
                    }`}
                    onClick={() => handleVerifyEmail(values.email)}
                    disabled={isVerifyButtonDisabled || !values.email}
                  >
                    Verify
                  </button>
                </div>
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="otp" className="block mb-2">
                  OTP (4 digits)
                </label>
                <Field
                  type="text"
                  name="otp"
                  className="w-full p-2 border rounded"
                />
                <ErrorMessage
                  name="otp"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="block mb-2">
                  Password (6+ characters, letters and numbers)
                </label>
                <Field
                  type="password"
                  name="password"
                  className="w-full p-2 border rounded"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="confirmPassword" className="block mb-2">
                  Confirm Password
                </label>
                <Field
                  type="password"
                  name="confirmPassword"
                  className="w-full p-2 border rounded"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded"
                // disabled={isSubmitting || !isValid || !dirty}
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
        <div className="my-5">
          <h1>
            Already Have an account?<span onClick={()=> navigate('/login')} className="text-blue-500 underline">Log in</span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

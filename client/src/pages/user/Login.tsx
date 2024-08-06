import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { BACKEND_URL } from "../../constants/constants";
import { config } from "../../constants/config";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContextFun";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { checkAuth } = useAuth();

  useEffect(()=>{
    checkAuth()
  },[axios])

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required"),
  });

  const handleSubmit = async (values: typeof initialValues, { setSubmitting }: any) => {
    try {
      const result = await axios.post(
        `${BACKEND_URL}/api/auth/login`,
        values,
        config
      );
      if (result?.data?.success) {
        toast.success("Login successful");
        navigate('/home');
      } else {
        toast.error( result?.data?.message )
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center border-b-4 border-black rounded-md">
      <div className="border rounded-md border-b-2 p-8">
        <div className="flex justify-center mb-10 font-semibold font-serif">
          <h1 className="transform animate-pulse text-xl text-blue-700">Welcome to Todo Management</h1>
        </div>
        <h1 className="underline mb-3 font-sans">Log In to the Application</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label htmlFor="email" className="block mb-2">
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  className="w-full p-2 border rounded"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="block mb-2">
                  Password
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

              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logging in..." : "Log In"}
              </button>
            </Form>
          )}
        </Formik>
        <div className="my-5">
          <h1>
            Don't have an account? <span onClick={() => navigate('/signup')} className="text-blue-500 underline cursor-pointer">Sign up</span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Login;
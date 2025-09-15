"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Link from "next/link";
import { Button } from "react-bootstrap";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ApiClient from "@/Services/APIs";
import "./Login.css";

import { use } from "react";

const schema = yup.object().shape({
  email: yup
    .string()
    .test("email-or-phone", "Enter a valid email or phone number", (value) => {
      if (!value) return false;

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const intlRegex = /^\+?[1-9]\d{6,14}$/;

      return emailRegex.test(value) || intlRegex.test(value);
    })
    .required("Email or phone is required"),

  password: yup
    .string()
    .min(6, "At least 6 characters")
    .required("Password is required"),
});

const Login = ({ params }) => {
  const router = useRouter();
  const [apiError, setApiError] = React.useState("");
  const { locale } = use(params);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await ApiClient.post("merchant/login", data);

      const token = response.data.token;
      const name = response.data.merchant.name;

      localStorage.setItem("Auth_Token", token);
      localStorage.setItem("User_Name", name);

      window.dispatchEvent(new Event("storage"));

      router.push(`/${locale}`);
    } catch (error) {
      console.error("❌ Full API Error:", error);

      console.log("❌ Error Response:", error.response);

      setApiError(
        error.response?.data?.message || error.message || "Something went wrong"
      );
    }
  };

  return (
    <div className="login">
      <div className="wrapper">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="logo">
            <Image src="/cannata21.png" alt="Logo" width={120} height={70} />
          </div>
          <h2 style={{ color: "gray" }}>Login</h2>
          <p style={{ color: "gray" }}>
            Enter your email or phone and password to login
          </p>

          <div className="input-field">
            <input type="text" {...register("email")} />
            <label>Enter your email or phone</label>
            {errors.email && (
              <span className="error">{errors.email.message}</span>
            )}
          </div>

          <div className="input-field">
            <input type="password" {...register("password")} />
            <label>Enter your password</label>
            {errors.password && (
              <span className="error">{errors.password.message}</span>
            )}
          </div>

          <button className="button-log" type="submit">
            Login
          </button>
          {apiError && <p className="error-message">{apiError}</p>}

          <div className="register">
            <p>
              Don’t have an account?{" "}
              <Link className="Link" href={`/${locale}/signUp`}>
                Sign Up
              </Link>
              <br /> Or continue with
            </p>

            <Button variant="light" className="mt-2 mx-2">
              <Image
                className="p-2"
                src="/images/Socialicon.png"
                alt="Facebook"
                width={30}
                height={30}
              />
              <span>Login with Facebook</span>
            </Button>

            <Button variant="light" className="mt-2 mx-2">
              <Image
                className="p-2"
                src="/images/Socialicon(1).png"
                alt="Google"
                width={30}
                height={30}
              />
              <span>Login with Google</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

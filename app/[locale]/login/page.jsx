"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ApiClient from "@/Services/APIs";
import "./Login.css";

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
  const locale = params?.locale || "en";

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
      setApiError(
        error.response?.data?.message || error.message || "Something went wrong"
      );
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-left">
          <Image src="/images/image11.png" alt="Login Banner" fill priority />
        </div>
        <div className="login-right">
          <div className="logo mb-3">
            <Image src="/cannata21.png" alt="Logo" width={100} height={60} />
          </div>
          <h2>Welcome Back</h2>
          <p>Login to continue using Cannata</p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="input-box">
              <input type="text" {...register("email")} placeholder="Email or Phone" />
              {errors.email && <span className="error">{errors.email.message}</span>}
            </div>

            <div className="input-box">
              <input type="password" {...register("password")} placeholder="Password" />
              {errors.password && <span className="error">{errors.password.message}</span>}
            </div>

            {apiError && <p className="error-message">{apiError}</p>}

            <button type="submit" className="btn-login">
              Login
            </button>
          </form>

          <p className="signup-text">
            Don’t have an account?{" "}
            <Link href={`/${locale}/signUp`} className="link-login">
              Sign Up
            </Link>
          </p>

          <div className="social-login">
            <button className="social-btn facebook">
              <Image src="/images/Socialicon.png" alt="Facebook" width={20} height={20} />
              <span>Facebook</span>
            </button>
            <button className="social-btn google">
              <Image src="/images/Socialicon(1).png" alt="Google" width={20} height={20} />
              <span>Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

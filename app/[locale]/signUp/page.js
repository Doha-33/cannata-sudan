"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Link from "next/link";
import { Button } from "react-bootstrap";
import Image from "next/image";
import "./SignUp.css";
import ApiClient from "@/Services/APIs";
import { useRouter } from "next/navigation";
import OTPModal from "@/components/OTPModal";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const schema = yup.object().shape({
  first_name: yup
    .string()
    .required("First name is required")
    .min(2, "At least 2 characters"),
  last_name: yup
    .string()
    .required("Last name is required")
    .min(2, "At least 2 characters"),
  company: yup.string().nullable(),
  email: yup.string().email("Invalid email"),
  phone: yup
    .string()
    .required("Phone is required")
    .matches(/^\+?[1-9]\d{6,14}$/, "Enter a valid phone number"),
  password: yup
    .string()
    .min(6, "At least 6 characters")
    .required("Password is required"),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

const SignUp = ({ params }) => {
  const [backendError, setBackendError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [formData, setFormData] = useState(null);

  const { locale } = React.use(params);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setBackendError("");
    setIsLoading(true);
    try {
      const payload = {
        ...data,
        name: `${data.first_name} ${data.last_name}`,
      };
      delete payload.first_name;
      delete payload.last_name;

      const response = await ApiClient.post("merchant/register", payload);
      console.log("✅ Register Response:", response);

      setFormData(payload);
      setShowOtpModal(true);
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        "An error occurred during registration.";
      setBackendError(message);
      console.error("❌ API Error:", message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="wrapper">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="logo">
            <Image src="/cannata21.png" alt="Logo" width={120} height={70} />
          </div>

          <h2 style={{ color: "gray" }}>Sign Up</h2>
          <p style={{ color: "gray" }}>Enter your details to sign up</p>

          <div className="input-row">
            <div className="input-field">
              <input type="text" {...register("first_name")} />
              <label>First Name</label>
              {errors.first_name && (
                <span className="error">{errors.first_name.message}</span>
              )}
            </div>

            <div className="input-field">
              <input type="text" {...register("last_name")} />
              <label>Last Name</label>
              {errors.last_name && (
                <span className="error">{errors.last_name.message}</span>
              )}
            </div>
          </div>

          <div className="input-field">
            <input type="text" {...register("company")} />
            <label>Your Company</label>
            {errors.company && (
              <span className="error">{errors.company.message}</span>
            )}
          </div>

          <div className="input-field">
            <PhoneInput
              country={"ae"}
              enableSearch={true}
              searchPlaceholder="Search country"
              searchNotFound="No country found"
              inputProps={{
                name: "phone",
                required: true,
              }}
              value={watch("phone")}
              onChange={(phone) => setValue("phone", "+" + phone)}
              inputClass="w-100"
              buttonClass="country-btn"
              dropdownClass="country-dropdown"
              dropdownStyle={{
                maxHeight: "300px",
                overflowY: "auto",
                width: "250px",
              }}
            />

            {errors.phone && (
              <span className="error">{errors.phone.message}</span>
            )}

            <style jsx global>{`
              .country-dropdown .search-box::before {
                display: none !important;
              }
            `}</style>
          </div>

          <div className="input-field">
            <input type="text" {...register("email")} />
            <label>Email</label>
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

          <div className="input-field">
            <input type="password" {...register("password_confirmation")} />
            <label>Confirm your password</label>
            {errors.password_confirmation && (
              <span className="error">
                {errors.password_confirmation.message}
              </span>
            )}
          </div>

          <button className="button-log d-felx " type="submit">
            <span>Sign Up</span>
            {isLoading && (
              <div className="spinner-container">
                <div className="sk-fading-circle">
                  <div className="sk-circle1 sk-circle"></div>
                  <div className="sk-circle2 sk-circle"></div>
                  <div className="sk-circle3 sk-circle"></div>
                  <div className="sk-circle4 sk-circle"></div>
                  <div className="sk-circle5 sk-circle"></div>
                  <div className="sk-circle6 sk-circle"></div>
                  <div className="sk-circle7 sk-circle"></div>
                  <div className="sk-circle8 sk-circle"></div>
                  <div className="sk-circle9 sk-circle"></div>
                  <div className="sk-circle10 sk-circle"></div>
                  <div className="sk-circle11 sk-circle"></div>
                  <div className="sk-circle12 sk-circle"></div>
                </div>
              </div>
            )}
          </button>
          {backendError && <div className="error-message">{backendError}</div>}

          <div className="register">
            <p>
              Have an account?{" "}
              <Link className="Link" href={`/${locale}/login`}>
                Sign In
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
              <span>Sign up with Facebook</span>
            </Button>

            <Button variant="light" className="mt-2 mx-2">
              <Image
                className="p-2"
                src="/images/Socialicon(1).png"
                alt="Google"
                width={30}
                height={30}
              />
              <span>Sign up with Google</span>
            </Button>
          </div>
        </form>
      </div>

      <OTPModal
        show={showOtpModal}
        onHide={() => setShowOtpModal(false)}
        email={formData?.email}
        phone={formData?.phone}
        onVerified={() => {
          router.push(`/${locale}/login`);
        }}
      />
    </div>
  );
};

export default SignUp;

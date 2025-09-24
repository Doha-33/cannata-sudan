"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ApiClient from "@/Services/APIs";
import OTPModal from "@/components/OTPModal";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./SignUp.css"; // نفس استايل اللوجين

const schema = yup.object().shape({
  first_name: yup.string().required("First name is required").min(2, "At least 2 characters"),
  last_name: yup.string().required("Last name is required").min(2, "At least 2 characters"),
  company: yup.string().nullable(),
  email: yup.string().email("Invalid email"),
  phone: yup
    .string()
    .required("Phone is required")
    .matches(/^\+?[1-9]\d{6,14}$/, "Enter a valid phone number"),
  password: yup.string().min(6, "At least 6 characters").required("Password is required"),
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
  const router = useRouter();
  const locale = params?.locale || "en";

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
        error?.response?.data?.message || "An error occurred during registration.";
      setBackendError(message);
      console.error("❌ API Error:", message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        {/* Left side image */}
        <div className="login-left">
          <Image src="/images/image11.png" alt="Signup Banner" fill priority />
        </div>

        {/* Right side form */}
        <div className="login-right">
          <div className="logo mb-3">
            <Image src="/cannata21.png" alt="Logo" width={100} height={60} />
          </div>
          <h2>Create Account</h2>
          <p>Enter your details to sign up</p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="input-box">
              <input type="text" {...register("first_name")} placeholder="First Name" />
              {errors.first_name && <span className="error">{errors.first_name.message}</span>}
            </div>

            <div className="input-box">
              <input type="text" {...register("last_name")} placeholder="Last Name" />
              {errors.last_name && <span className="error">{errors.last_name.message}</span>}
            </div>

            <div className="input-box">
              <input type="text" {...register("company")} placeholder="Company (optional)" />
              {errors.company && <span className="error">{errors.company.message}</span>}
            </div>

            <div className="input-box">
              <PhoneInput
                country={"ae"}
                enableSearch={true}
                inputProps={{ name: "phone", required: true }}
                value={watch("phone")}
                onChange={(phone) => setValue("phone", "+" + phone)}
                inputClass="w-100"
                buttonClass="country-btn"
                dropdownClass="country-dropdown"
              />
              {errors.phone && <span className="error">{errors.phone.message}</span>}
            </div>

            <div className="input-box">
              <input type="text" {...register("email")} placeholder="Email" />
              {errors.email && <span className="error">{errors.email.message}</span>}
            </div>

            <div className="input-box">
              <input type="password" {...register("password")} placeholder="Password" />
              {errors.password && <span className="error">{errors.password.message}</span>}
            </div>

            <div className="input-box">
              <input
                type="password"
                {...register("password_confirmation")}
                placeholder="Confirm Password"
              />
              {errors.password_confirmation && (
                <span className="error">{errors.password_confirmation.message}</span>
              )}
            </div>

            {backendError && <p className="error-message">{backendError}</p>}

            <button type="submit" className="btn-login" disabled={isLoading}>
              {isLoading ? "Signing up..." : "Sign Up"}
            </button>
          </form>

          <p className="signup-text">
            Already have an account?{" "}
            <Link href={`/${locale}/login`} className="link-login">
              Login
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

      {/* OTP Modal */}
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

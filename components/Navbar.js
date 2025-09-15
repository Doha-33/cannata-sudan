"use client";
import React, { useEffect, useState } from "react";
import "./Navbar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import LanguageToggle from "./LanguageSwitcher";
import { IoPersonCircleOutline } from "react-icons/io5";
import useTranslationClient from "@/hooks/useTranslationClient";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { getAPI } from "@/Services/APIs";

const Navbar = () => {
  const [setting, setSetting] = useState(null);
  const params = useParams();
  const locale = params.locale || "en";
  const { i18n } = useTranslation();
  const { t } = useTranslationClient();
  const isArabic = i18n.language === "ar";
  const router = useRouter();
  const [authToken, setAuthToken] = useState(null);
  const [userName, setUserName] = useState("");

  // ✅ تحميل أولي + الاستماع للتغيرات
  useEffect(() => {
    const loadAuth = () => {
      const token = localStorage.getItem("Auth_Token");
      const name = localStorage.getItem("User_Name");
      setAuthToken(token);
      setUserName(name || "");
    };

    loadAuth(); // أول مرة

    // listener للتغيرات بين التبويبات أو من window.dispatchEvent
    window.addEventListener("storage", loadAuth);
    return () => window.removeEventListener("storage", loadAuth);
  }, []);

  const handleNavItemClick = () => {
    if (typeof window !== "undefined" && window.bootstrap) {
      const navbarCollapse = document.getElementById("navbarNav");
      if (navbarCollapse && navbarCollapse.classList.contains("show")) {
        const bsCollapse =
          window.bootstrap.Collapse.getInstance(navbarCollapse) ||
          new window.bootstrap.Collapse(navbarCollapse, { toggle: false });
        bsCollapse.hide();
      }
    }
  };

  const removeToken = () => {
    localStorage.removeItem("Auth_Token");
    localStorage.removeItem("User_Name");
    setAuthToken(null);
    setUserName("");
    window.dispatchEvent(new Event("storage")); // ✨ عشان يحدث الـ Navbar فوراً
  };

  useEffect(() => {
    getAPI("setting")
      .then((res) => {
        setSetting(res.data.data[0]);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <>
      {/* ✅ الهيدر العلوي */}
      <div
        className="fixed-header d-flex justify-content-between align-items-center px-3 px-md-5 py-1 text-white"
        style={{ backgroundColor: "rgb(191, 5, 22)", height: "40px" }}
      >
        <div className="d-flex align-items-center link">
          <IoPersonCircleOutline size={20} />
          <span className="px-2">
            {authToken ? (
              <>
                <span className="link text-white">
                  {t("Welcome")}, {userName} /
                </span>
                <Link
                  onClick={removeToken}
                  className="link ms-2"
                  href={`/${locale}`}
                >
                  {t("Log out")}
                </Link>
              </>
            ) : (
              <div>
                <Link className="link" href={`/${locale}/signUp`}>
                  {t("Sign Up")}
                </Link>{" "}
                /{" "}
                <Link className="link" href={`/${locale}/login`}>
                  {t("Sign In")}
                </Link>
              </div>
            )}
          </span>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <Link
            className="btn btn-sm d-none d-lg-block my-0 mx-5"
            href="https://new.cannata.co/"
            style={{ backgroundColor: "#C82338", color: "white" }}
            type="button"
          >
            {t("Sudan Web Site")}
          </Link>
          <LanguageToggle />
        </div>
      </div>

      {/* ✅ النافبار */}
      <nav
        className="navbar navbar-expand-lg bg-white shadow px-3 px-md-5 "
        style={{
          position: "fixed",
          top: "40px",
          left: 0,
          width: "100%",
          zIndex: 1000,
        }}
      >
        <div className="container d-flex flex-wrap align-items-center justify-content-between">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse mt-3 mt-lg-0" id="navbarNav">
            <ul
              className={`navbar-nav mb-2 mb-lg-0 ${
                isArabic ? "ms-auto" : "me-auto"
              }`}
              style={{ direction: isArabic ? "rtl" : "ltr" }}
            >
              <li className="nav-item">
                <Link
                  className="nav-link"
                  href={`/${locale}/`}
                  onClick={handleNavItemClick}
                >
                  {t("home")}
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  href={`/${locale}/about`}
                  onClick={handleNavItemClick}
                >
                  {t("about")}
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  href={`/${locale}/services`}
                  onClick={handleNavItemClick}
                >
                  {t("service")}
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  href={`/${locale}/blogs`}
                  onClick={handleNavItemClick}
                >
                  {t("blog")}
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  href={`/${locale}/gallery`}
                  onClick={handleNavItemClick}
                >
                  {t("gallary")}
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  href={`/${locale}/tracking`}
                  onClick={handleNavItemClick}
                >
                  {t("Tracking")}
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  href={`/${locale}/contact`}
                  onClick={handleNavItemClick}
                >
                  {t("contact")}
                </Link>
              </li>
            </ul>
          </div>
          <div className="d-flex align-items-center justify-content-center">
            <Link
              className="btn btn-sm d-none d-lg-block my-0 mx-5"
              href="http://sodan.corebrackets.com/"
              style={{ backgroundColor: "rgb(45, 44, 111)", color: "white" }}
              type="button"
            >
              {t("Dubai Web Site")}
            </Link>

            <Link href={`/${locale}/`}>
              <img
                src={setting?.logo || "/cannata21.png"}
                alt="Logo"
                style={{
                  width: "45px",
                  height: "45px",
                }}
              />
            </Link>
          </div>
        </div>
      </nav>
      <div className="sticky-placeholder"></div>
    </>
  );
};

export default Navbar;

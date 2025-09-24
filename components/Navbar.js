"use client";
import React from "react";
import "./Navbar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import LanguageToggle from "./LanguageSwitcher";
import { IoPersonCircleOutline } from "react-icons/io5";
import useTranslationClient from "@/hooks/useTranslationClient";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getAPI } from "@/Services/APIs";

const Navbar = () => {
  const [setting, setSetting] = useState(null);
  const params = useParams();
  const locale = params.locale || "en";
  const { i18n } = useTranslation();
  const { t, ready } = useTranslationClient();
  const isArabic = i18n.language === "ar";
  const router = useRouter();
  const [authToken, setAuthToken] = useState(null);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem("Auth_Token");
      const name = localStorage.getItem("User_Name");
      setAuthToken(token);
      setUserName(name || "");
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
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
    localStorage.removeItem("User_Name"); // لو عايزة تمسحي الاسم برضه
    setAuthToken(null); // ✨ تحدثي الstate
    setUserName(""); // ✨ تمسحي الاسم من الواجهة
  };

  useEffect(() => {
    getAPI("setting")
      .then((res) => {
        setSetting(res.data.data[0]);
      })
      .catch();
  }, []);

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js").then(() => {});
  }, []);

  return (
    <>
      <div
        className="fixed-header d-flex justify-content-between align-items-center px-3 px-md-5 py-1 text-white"
        style={{ backgroundColor: "#C82338", height: "40px" }}
      >
        <div className="d-flex align-items-center link">
          <div className="dropdown user-dropdown">
            <button
              className="btn user-btn d-flex align-items-center justify-content-center pt-4"
              type="button"
              id="userMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <IoPersonCircleOutline size={26} className="m-2" />
              <span>
                {authToken ? `${t("Welcome,")} ${userName}` : t("Acount")}
              </span>
            </button>

            <ul className="dropdown-menu dropdown-menu-end shadow-sm border-0 rounded-3 p-2">
              {authToken ? (
                <>
                  <li>
                    <Link
                      className="dropdown-item rounded-2"
                      href={`/${locale}/editprofile`}
                      onClick={handleNavItemClick}
                    >
                      <i className="bi bi-person me-2"></i>
                      {t("Profile")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item rounded-2"
                      href={`/${locale}/order`}
                      onClick={handleNavItemClick}
                    >
                      <i className="bi bi-bag-check me-2"></i>
                      {t("My Orders")}
                    </Link>
                  </li>
                  <li>
                    <button
                      className="dropdown-item text-danger rounded-2"
                      onClick={removeToken}
                    >
                      <i className="bi bi-box-arrow-right me-2"></i>
                      {t("Log out")}
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      className="dropdown-item rounded-2"
                      href={`/${locale}/signUp`}
                      onClick={handleNavItemClick}
                    >
                      <i className="bi bi-person-plus me-2"></i>
                      {t("Sign Up")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item rounded-2"
                      href={`/${locale}/login`}
                      onClick={handleNavItemClick}
                    >
                      <i className="bi bi-box-arrow-in-right me-2"></i>
                      {t("Sign In")}
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <Link
            className="btn btn-sm d-none d-lg-block my-0 mx-5"
            href="https://new.cannata.co/"
            style={{ backgroundColor: "rgb(45, 44, 111)", color: "white" }}
            type="button"
          >
            {t("UEA Site")}
          </Link>
          <LanguageToggle />
        </div>
      </div>

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
            <div
              className="d-flex align-items-center justify-content-center"
              style={{ position: "relative", width: "400px" }}
            >
              <button
                className={`py-2 ${isArabic ? "ps-5" : "pe-5"}`}
                onClick={() => {
                  router.push(`/${locale}/shipping`);
                  handleNavItemClick();
                }}
                style={{
                  backgroundColor: "#C82338",
                  color: "white",
                  clipPath: isArabic
                    ? "polygon(0 0, 100% 0, 100% 100%, 30% 100%)"
                    : "polygon(0 0, 100% 0, 70% 100%, 0% 100%)",
                  direction: isArabic ? "rtl" : "ltr",
                  textAlign: "center",
                  fontSize: "1rem",
                  whiteSpace: "nowrap",
                  cursor: "pointer",
                  border: "none",
                  width: "180px",
                  position: "absolute",
                  right: isArabic ? "-5%" : "60%",
                }}
              >
                {t("shipping")}
              </button>
              <button
                className={`py-2 ${isArabic ? "pe-5" : "ps-5"}`}
                onClick={() => {
                  router.push(`/${locale}/tracking`);
                  handleNavItemClick();
                }}
                style={{
                  backgroundColor: "rgb(45, 44, 111)",
                  color: "white",
                  clipPath: isArabic
                    ? "polygon(0% 0%, 70% 0%, 100% 100%, 0% 100%)"
                    : "polygon(30% 0%, 100% 0%, 100% 100%, 0% 100%)",
                  direction: isArabic ? "rtl" : "ltr",
                  textAlign: "center",
                  fontSize: "1rem",
                  whiteSpace: "nowrap",
                  cursor: "pointer",
                  border: "none",
                  width: "180px",
                }}
              >
                {t("Tracking")}
              </button>
            </div>

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
              {/* <li className="nav-item">
                <Link
                  className="nav-link"
                  href={`/${locale}/tracking`}
                  onClick={handleNavItemClick}
                >
                  {t("Tracking")}
                </Link>
              </li> */}
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

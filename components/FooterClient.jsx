"use client";
import React from "react";
import { useTranslation } from "react-i18next";
import "./Footer.css";
import { FiPhoneCall } from "react-icons/fi";
import { FaLocationDot } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram, AiFillTikTok } from "react-icons/ai";
import { FaLinkedin } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Footer = ({ locale, setting, services }) => {
  const { t, i18n } = useTranslation();
  const isArabic = locale === "ar";
  const router = useRouter();

  return (
    <footer className={`footer ${isArabic ? "rtl" : "ltr"}`}>
      <div className="container">
        <div className="footer-row">
          {isArabic ? (
            <>
              {/* Follow Us */}
              <div className="footer-col pb-5">
                <h4>{t("Follow Us:")}</h4>
                <div className="social-links">
                  <a href="https://www.facebook.com/share/1D3G7KnrB5/?mibextid=wwXIfr">
                    <FaFacebook size={"35px"} color="rgb(200, 35, 56)" />
                  </a>
                  <a href="https://www.instagram.com/cannata.ar?igsh=MW50NDA4cDhlY2pvcA%3D%3D&utm_source=qr">
                    <AiFillInstagram size={"35px"} color="rgb(200, 35, 56)" />
                  </a>
                  <a href="https://www.tiktok.com/@cannata.ar?_t=ZS-8y9oNFZ9HGb&_r=1">
                    <AiFillTikTok size={"35px"} color="rgb(200, 35, 56)" />
                  </a>
                  <a href="https://www.linkedin.com/company/cannata-world-wide-cargo-services/">
                    <FaLinkedin size={"35px"} color="rgb(200, 35, 56)" />
                  </a>
                </div>
              </div>

              {/* Connect With Us */}
              <div className="footer-col">
                <h4>{t("Connect with Us")}</h4>
                <ul>
                  <li>
                    <Link href={`/${locale}/about`}>{t("About Us")}</Link>
                  </li>
                  <li>
                    <Link href={`/${locale}/blogs`}>{t("Latest Blogs")}</Link>
                  </li>
                  <li>
                    <Link href={`/${locale}/contact`}>{t("contact")}</Link>
                  </li>
                  <li>
                    <Link href={`/${locale}/custom`}>
                      {t("Custom Clearnace")}
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Services */}
              <div className="footer-col">
                <h4>{t("Our services")}</h4>
                <ul style={{ color: "white", cursor: "pointer" }}>
                  {services.map((item) => (
                    <li
                      key={`services-${locale}-${item.id}`}
                      onClick={() =>
                        router.push(`/${locale}/services/${item.id}`)
                      }
                    >
                      <a>
                        {item.title && typeof item.title === "object"
                          ? item.title[isArabic ? "ar" : "en"]
                          : item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Logo + Contact */}
              <div className="footer-col">
                <div
                  style={{
                    textAlign: "center",
                    padding: "20px",
                    borderRadius: "50%",
                    width: "120px",
                    height: "120px",
                    backgroundColor: "rgba(255, 255, 255, 1)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={setting?.logo || "/images/cannata21.png"}
                    alt="logo"
                  />
                </div>
                <div className="d-flex pt-2 align-items-start">
                  <FiPhoneCall
                    className="p-2 mt-2 me-2 rounded"
                    color="white"
                    size={"30px"}
                    style={{ backgroundColor: "rgb(200, 35, 56)" }}
                  />
                  <div className="m-1 text-light d-flex flex-column">
                    <span>{setting?.phone}</span>
                    <span>{setting?.phone_two}</span>
                  </div>
                </div>
                <div className="d-flex pt-1 align-items-start">
                  <FaLocationDot
                    className="p-2 mt-2 me-2 rounded"
                    color="white"
                    size={"40px"}
                    style={{ backgroundColor: "rgb(200, 35, 56)" }}
                  />
                  <div className="m-1 text-light d-flex flex-column">
                    {setting?.locations?.map((location, index) => (
                      <span className="location" key={index}>
                        {isArabic ? location.name.ar : location.name.en}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Logo + Contact */}
              <div className="footer-col">
                <div
                  style={{
                    textAlign: "center",
                    padding: "20px",
                    borderRadius: "50%",
                    width: "120px",
                    height: "120px",
                    backgroundColor: "rgba(255, 255, 255, 1)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={setting?.logo || "/images/cannata21.png"}
                    alt="logo"
                  />
                </div>
                <div className="d-flex pt-2 align-items-start">
                  <FiPhoneCall
                    className="p-2 mt-2 me-2 rounded"
                    color="white"
                    size={"30px"}
                    style={{ backgroundColor: "rgb(200, 35, 56)" }}
                  />
                  <div className="m-1 text-light d-flex flex-column">
                    <span>{setting?.phone}</span>
                    <span>{setting?.phone_two}</span>
                  </div>
                </div>
                <div className="d-flex pt-1 align-items-start">
                  <FaLocationDot
                    className="p-2 mt-2 me-2 rounded"
                    color="white"
                    size={"40px"}
                    style={{ backgroundColor: "rgb(200, 35, 56)" }}
                  />
                  <div className="m-1 text-light d-flex flex-column">
                    {setting?.locations?.map((location, index) => (
                      <span className="location" key={index}>
                        {isArabic ? location.name.ar : location.name.en}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Connect With Us */}
              <div className="footer-col">
                <h4>{t("Connect with Us")}</h4>
                <ul>
                  <li>
                    <Link href={`/${locale}/about`}>{t("About Us")}</Link>
                  </li>
                  <li>
                    <Link href={`/${locale}/blogs`}>{t("Latest Blogs")}</Link>
                  </li>
                  <li>
                    <Link href={`/${locale}/contact`}>{t("contact")}</Link>
                  </li>
                  <li>
                    <Link href={`/${locale}/custom`}>
                      {t("Custom Clearnace")}
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Services */}
              <div className="footer-col">
                <h4>{t("Our services")}</h4>
                <ul style={{ color: "white", cursor: "pointer" }}>
                  {services.map((item) => (
                    <li
                      key={`services-${locale}-${item.id}`}
                      onClick={() =>
                        router.push(`/${locale}/services/${item.id}`)
                      }
                    >
                      <a>
                        {item.title && typeof item.title === "object"
                          ? item.title[isArabic ? "ar" : "en"]
                          : item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Follow Us */}
              <div className="footer-col pb-5">
                <h4>{t("Follow Us:")}</h4>
                <div className="social-links">
                  <a href="https://www.facebook.com/share/1D3G7KnrB5/?mibextid=wwXIfr">
                    <FaFacebook size={"35px"} color="rgb(200, 35, 56)" />
                  </a>
                  <a href="https://www.instagram.com/cannata.ar?igsh=MW50NDA4cDhlY2pvcA%3D%3D&utm_source=qr">
                    <AiFillInstagram size={"35px"} color="rgb(200, 35, 56)" />
                  </a>
                  <a href="https://www.tiktok.com/@cannata.ar?_t=ZS-8y9oNFZ9HGb&_r=1">
                    <AiFillTikTok size={"35px"} color="rgb(200, 35, 56)" />
                  </a>
                  <a href="https://www.linkedin.com/company/cannata-world-wide-cargo-services/">
                    <FaLinkedin size={"35px"} color="rgb(200, 35, 56)" />
                  </a>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <hr style={{ color: "gray" }} />
      <div className="text-center">
        <p className="text-light">
          &copy; 2025 Powered by{" "}
          <a href="https://corebrackets.com/">Core-Brackets</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;

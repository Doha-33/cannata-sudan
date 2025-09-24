"use client";
import React from "react";
import { useTranslation } from "react-i18next";
import "./Footer.css";
import { FiPhoneCall } from "react-icons/fi";
import { FaLocationDot, FaYoutube } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram, AiFillTwitterCircle } from "react-icons/ai";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Footer = ({ locale, setting, services }) => {
  const { t, i18n } = useTranslation();
  const isArabic = locale === "ar";
  const router = useRouter();

  const socials = [
    {
      icon: <FaFacebook />,
      url: setting.facebook ||"https://www.facebook.com",
    },
    { icon: <AiFillInstagram />, url: setting.instagram ||"https://www.instagram.com/cannata_cargo_services/" },
    { icon: <AiFillTwitterCircle />, url: setting.twitter || "https://x.com/CannataCargoUAE" },
    {
      icon: <FaYoutube />,
      url: setting.youtube ||"https://www.linkedin.com/company/cannata-world-wide-cargo-services/",
    },
  ];

  const Locations = [
    {
      lat: 25.288306,
      lng: 55.318263,
      name: {
        en: "78Q9+79C - Deira - Dubai - United Arab Emirates",
        ar: "78Q9+79C - ديرة - دبي - الإمارات العربية المتحدة",
      },
    },
    {
      lat: 25.230326,
      lng: 55.363081,
      name: {
        en: "3 7A Street - Umm Ramool - Dubai - United Arab Emirates",
        ar: "3 7A Street - أم رمول - دبي - الإمارات العربية المتحدة",
      },
    },
    {
      lat: 24.9609375,
      lng: 55.0633125,
      name: {
        en: "X367+98H - Jebel Ali - Jebel Ali Free Zone - Dubai - United Arab Emirates",
        ar: "X367+98H - جبل علي - منطقة جبل علي الحرة - دبي - الإمارات العربية المتحدة",
      },
    },
  ];
  const locations = setting?.locations?.length
    ? setting.locations.map((loc, index) => ({
        lat: parseFloat(loc.latitude),
        lng: parseFloat(loc.longitude),
        name: {
          en: loc?.name?.en || Locations[index]?.name.en,
          ar: loc?.name?.ar || Locations[index]?.name.ar,
        },
      }))
    : Locations;
  return (
    <footer className={`footer ${isArabic ? "rtl" : "ltr"}`}>
      <div className="container">
        <div className="footer-row">
          {isArabic ? (
            <>
              {/* Follow Us */}
              <div className="footer-col pb-5">
                <h4>{t("Follow Us:")}</h4>
                <div className="socials">
                  {socials.map((s, i) => (
                    <a href={s.url} key={i} target="_blank" rel="noreferrer">
                      {s.icon}
                    </a>
                  ))}
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
                    {locations.map((location, index) => (
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
                    {locations.map((location, index) => (
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
                <div className="socials">
                  {socials.map((s, i) => (
                    <a href={s.url} key={i} target="_blank" rel="noreferrer">
                      {s.icon}
                    </a>
                  ))}
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

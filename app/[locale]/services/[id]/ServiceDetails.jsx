"use client";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FiPhoneCall, FiMail } from "react-icons/fi";
import { FaLocationDot } from "react-icons/fa6";
import "./serviceData.css";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

const ServiceDetails = ({ id, locale, service, allServices, faqs, setting }) => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const router = useRouter();

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const fallbackData = {
    title: "LOGISTICS SOLUTIONS",
    image: "/images/image11.png",
    description:
      "WE PROVIDE COMPLETE LOGISTICS SERVICES DESIGNED TO MEET YOUR BUSINESS NEEDS WITH EFFICIENCY AND RELIABILITY.",
  };

  const currentService = service || fallbackData;
  const currentLang = i18n.language;

  return (
    <> 
      <div
        className="con d-flex flex-wrap w-100 justify-content-center"
        dir={isArabic ? "rtl" : "ltr"}
      >
        {/* Left side */}
        <div className="px-3" style={{ width: "60%" }}>
          <div className=" py-2">
            <img
              src={currentService.image || "/images/image11.png"}
              alt=""
              style={{ width: "100%", height: "auto" }}
            />
            <h1>
              {currentService.title && typeof currentService.title === "object"
                ? currentService.title[isArabic ? "ar" : "en"]
                : fallbackData.title}
            </h1>
          </div>
          <p
            dangerouslySetInnerHTML={{
              __html:
                currentService.description &&
                typeof currentService.description === "object"
                  ? currentService.description[isArabic ? "ar" : "en"]
                  : fallbackData.description,
            }}
          ></p>

          {/* FAQs */}
          <div className="faqs-container" style={{ marginTop: "30px" }}>
            <h2>{t("FAQs")}</h2>

            {faqs.map((faq, index) => (
              <div key={faq.id} className="faq-item" style={{ marginBottom: "15px" }}>
                <div
                  className="faq-question"
                  onClick={() => toggleFAQ(index)}
                  style={{
                    cursor: "pointer",
                    fontWeight: "bold",
                    background: "#eee",
                    padding: "10px",
                    borderRadius: "5px",
                  }}
                >
                  {faq.title[isArabic ? "ar" : "en"]}
                </div>

                <AnimatePresence initial={false}>
                  {activeIndex === index && (
                    <motion.div
                      key={index}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ overflow: "hidden" }}
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="faq-answer"
                        style={{
                          padding: "10px",
                          background: "#f9f9f9",
                          borderRadius: "5px",
                          marginTop: "5px",
                        }}
                      >
                        <div
                          dangerouslySetInnerHTML={{
                            __html: faq.content[isArabic ? "ar" : "en"],
                          }}
                        />
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* Right side */}
        <div className="p-3" style={{ width: "30%" }}>
          <div
            style={{
              width: "100%",
              minHeight: "380px",
              backgroundColor: "rgb(240, 236, 236)",
              padding: "5%",
              marginBottom: "5%",
              textAlign: "center",
            }}
          >
            <h5>{t("OUR CORE SERVICES")}</h5>

            <div
              style={{
                color: "white",
                padding: "1%",
                backgroundColor: "rgb(200, 35, 56)",
                textAlign: "center",
              }}
            >
              {currentService.title && typeof currentService.title === "object"
                ? currentService.title[currentLang]
                : fallbackData.title}
            </div>

            <div style={{ marginTop: "15px" }}>
              {allServices.map((item) => (
                <p
                  onClick={() => router.push(`/${locale}/services/${item.id}`)}
                  className="service-tap"
                  key={item._id}
                >
                  {item.title && typeof item.title === "object"
                    ? item.title[isArabic ? "ar" : "en"]
                    : item.title}
                </p>
              ))}
            </div>
          </div>

          {/* Contact info */}
          <div
            style={{
              width: "100%",
              minHeight: "300px",
              backgroundColor: "rgb(240, 236, 236)",
              padding: "5%",
              textAlign: "center",
            }}
          >
            <h5>{t("CONTACT INFO")}</h5>
            <div style={{ color: "white", paddingTop: "5%" }}>
              <div className="d-flex p-1 align-items-start">
                <FiPhoneCall
                  className="p-2 mt-2 me-2 rounded"
                  color="white"
                  size={"40px"}
                  style={{ backgroundColor: "rgb(200, 35, 56)" }}
                />
                <div className="m-1 text-dark d-flex flex-column align-items-center justify-content-center">
                  <span>{setting?.phone}</span>
                  <span>{setting?.phone_two}</span>
                </div>
              </div>

              <div className="d-flex p-1 align-items-center">
                <FaLocationDot
                  className="p-2 mt-2 me-2 rounded"
                  color="white"
                  size={"45px"}
                  style={{ backgroundColor: "rgb(200, 35, 56)" }}
                />
                <div className="m-1 text-dark d-flex flex-column">
                  {setting?.locations?.map((location, index) => (
                    <span className="location" key={index}>
                      {isArabic ? location.name.ar : location.name.en}
                    </span>
                  ))}
                </div>
              </div>

              <div className="d-flex p-1 align-items-start">
                <FiMail
                  className="p-2 mt-2 me-2 rounded"
                  color="white"
                  size={"40px"}
                  style={{ backgroundColor: "rgb(200, 35, 56)" }}
                />
                <div className="m-1 text-dark d-flex flex-column">
                  <span className="my-2">{setting?.email}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Custom Clearance */}
          <div
            onClick={() => router.push(`/${locale}/custom`)}
            style={{
              width: "100%",
              height: "50px",
              backgroundColor: "rgb(240, 236, 236)",
              textAlign: "center",
              marginTop: "5%",
              cursor: "pointer",
            }}
          >
            <h5>{t("Custom Clearnace")}</h5>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceDetails;

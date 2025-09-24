"use client";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FiPhoneCall, FiMail } from "react-icons/fi";
import { FaLocationDot } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import "./serviceData.css";

const ServiceDetails = ({
  id,
  locale,
  service,
  allServices,
  faqs,
  setting,
}) => {
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
    <div className="service-details" dir={isArabic ? "rtl" : "ltr"}>
      {/* Main Content */}
      <div className="service-main">
        {/* Image + Title */}
        <div className="service-card">
          <div className="w-100 text-center">
            <img
              src={currentService.image || "/images/image11.png"}
              alt="Service"
              className="service-image"
            />
          </div>
          <h1 className="service-title">
            {currentService.title && typeof currentService.title === "object"
              ? currentService.title[isArabic ? "ar" : "en"]
              : fallbackData.title}
          </h1>
          <p
            className="service-description"
            dangerouslySetInnerHTML={{
              __html:
                currentService.description &&
                typeof currentService.description === "object"
                  ? currentService.description[isArabic ? "ar" : "en"]
                  : fallbackData.description,
            }}
          />
        </div>

        {/* FAQs Section */}
        <div className="faq-section">
          <h2>{t("FAQs")}</h2>
          {faqs.map((faq, index) => (
            <div key={faq.id} className="faq-box">
              <div className="faq-question" onClick={() => toggleFAQ(index)}>
                {faq.title[isArabic ? "ar" : "en"]}
              </div>
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="faq-answer"
                  >
                    <div
                      dangerouslySetInnerHTML={{
                        __html: faq.content[isArabic ? "ar" : "en"],
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar */}
      <aside className="service-sidebar">
        {/* Services List */}
        <div className="sidebar-card">
          <h5>{t("OUR CORE SERVICES")}</h5>
          <ul className="services-list">
            {allServices.map((item) => (
              <li
                key={item._id}
                className={`service-item ${item.id === id ? "active" : ""}`}
                onClick={() => router.push(`/${locale}/services/${item.id}`)}
              >
                {item.title && typeof item.title === "object"
                  ? item.title[isArabic ? "ar" : "en"]
                  : item.title}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="sidebar-card">
          <h5>{t("CONTACT INFO")}</h5>
          <div className="contact-item">
            <FiPhoneCall className="contact-icon" />
            <div>
              <span>{setting?.phone}</span>
              <br />
              <span>{setting?.phone_two}</span>
            </div>
          </div>
          <div className="contact-item">
            <FaLocationDot className="contact-icon" />
            <div>
              {locations.map((location, index) => (
                    <p key={index}>
                      - {isArabic ? location.name.ar : location.name.en}
                    </p>
                  ))}
            </div>
          </div>
          <div className="contact-item">
            <FiMail className="contact-icon" />
            <span>{setting?.email}</span>
          </div>
        </div>

        {/* Custom Clearance */}
        <div
          className="sidebar-card custom-clearance"
          onClick={() => router.push(`/${locale}/custom`)}
        >
          <h5>{t("Custom Clearnace")}</h5>
        </div>
      </aside>
    </div>
  );
};

export default ServiceDetails;

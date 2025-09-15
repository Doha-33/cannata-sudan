'use client';

import { useTranslation } from "react-i18next";
import "./Home5.css";
import motion from "./motionClient";

export default function Home5Client({ isArabic, testimonials }) {
  const { t } = useTranslation();

  return (
    <div className="bg-light py-5">
      <motion.h1
      className="mb-3"
        style={{ textAlign: "center", padding: "1%" }}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        {t("Our Testimonials")}
      </motion.h1>

      <div className="testimonials">
        {testimonials.map((item, index) => (
          <motion.div
            key={item.id}
            className="card1"
            style={{ position: "relative" }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div style={{ width: "100%", textAlign: "center" }}>
              <img
                src={item.image}
                alt={item.title ? item.title[isArabic ? "ar" : "en"] : ""}
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
              />
              <p
                style={{
                  textAlign: "center",
                  padding: "4%",
                  fontSize: "16px",
                  color: "#C82338",
                }}
              >
                {item.description
                  ? item.description[isArabic ? "ar" : "en"]
                  : ""}
              </p>
            </div>

            <div
              className="name"
              style={{
                clipPath:
                  "polygon(82% 0%, 90% 80%, 100% 80%, 100% 100%, 0% 100%, 0% 0)",
                backgroundColor: "rgb(45, 44, 111)",
                width: "100%",
                height: "15%",
                textAlign: "center",
                color: "white",
                padding: "4%",
                position: "absolute",
                bottom: "0%",
              }}
            >
              <h6>{item.title ? item.title[isArabic ? "ar" : "en"] : ""}</h6>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

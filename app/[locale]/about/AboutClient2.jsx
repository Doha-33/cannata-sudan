"use client";
import { motion } from "framer-motion";
import React from "react";
import { useTranslation } from "react-i18next";
import "./about.css";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export default function AboutClient2({ about, locale }) {
  const { t } = useTranslation();
  const isArabic = locale === "ar";

  return (
    <>
      <motion.div
        className="p-lg-5 history-contain d-flex justify-content-evenly align-items-center"
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <motion.div
          className="history"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <h1 className="py-3" style={{ color: "black" }}>
            {t("OUR MISSION")}
          </h1>
          <div
            dangerouslySetInnerHTML={{
              __html: about?.mission?.[isArabic ? "ar" : "en"] || "",
            }}
          />
        </motion.div>
        <div className="image-contain" style={{ width: "40%", textAlign: "center" }}>
          <div
            className="history-img"
            style={{
              backgroundImage:
                "url('https://i.pinimg.com/736x/09/4d/59/094d59d143775be09293be64894cafb7.jpg')",
            }}
          ></div>
        </div>
      </motion.div>

      <motion.div
        className="p-lg-5 history-contain d-flex justify-content-evenly align-items-center"
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <div className="image-contain" style={{ width: "40%", textAlign: "center" }}>
          <div
            className="history-img"
            style={{
              backgroundImage:
                "url('https://i.pinimg.com/736x/4b/9d/6c/4b9d6c0162302a7e5a90f5ce6696d671.jpg')",
            }}
          ></div>
        </div>
        <motion.div
          className="history"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <h1 className="py-3" style={{ color: "black" }}>
            {t("OUR VISION")}
          </h1>
          <div
            dangerouslySetInnerHTML={{
              __html: about?.vision?.[isArabic ? "ar" : "en"] || "",
            }}
          />
        </motion.div>
      </motion.div>
    </>
  );
}

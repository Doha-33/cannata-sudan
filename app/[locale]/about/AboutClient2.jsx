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
          <h2 className="py-3" style={{ color: "black" }}>
            {t("OUR MISSION")}
          </h2>
          <div style={{fontSize:"1.2rem"}}
            dangerouslySetInnerHTML={{
              __html: about?.mission?.[isArabic ? "ar" : "en"] || "",
            }}
          />
        </motion.div>
        <div className="image-contain" style={{ width: "40%", textAlign: "center" }}>
          <img src="/images/mission.png" alt="" />
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
          <img src="/images/vision.png" />
        </div>
        <motion.div
          className="history"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <h2 className="py-3" style={{ color: "black" }}>
            {t("OUR VISION")}
          </h2>
          <div style={{fontSize:"1.2rem"}}
            dangerouslySetInnerHTML={{
              __html: about?.vision?.[isArabic ? "ar" : "en"] || "",
            }}
          />
        </motion.div>
      </motion.div>
    </>
  );
}

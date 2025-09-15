'use client';

import { useTranslation } from "react-i18next";
import "./Home4.css";
import motion from "./motionClient";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export default function Home4Client({ isArabic, items }) {
  const { t } = useTranslation();

  return (
    <div className="why">
      <motion.h1
        className="mb-3"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        {t("WHY CHOOSE US?")}
      </motion.h1>

      <div className="div1">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            className="div2"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <img
              src={item.image}
              alt={item.name ? item.name[isArabic ? "ar" : "en"] : ""}
              style={{ width: "80px", height: "80px", objectFit: "contain" }}
            />
            <h4>{item.name ? item.name[isArabic ? "ar" : "en"] : ""}</h4>
            <div
              dangerouslySetInnerHTML={{
                __html: item.description
                  ? item.description[isArabic ? "ar" : "en"]
                  : "",
              }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

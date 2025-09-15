"use client";

import "./Home8.css";
import motion from "./motionClient";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export default function Home8Client({ historyData, isArabic }) {
  return (
    <div>
      <motion.h1
        className="pt-5"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        {isArabic ? "تاريخنا" : "OUR HISTORY"}
      </motion.h1>

      <div className={`timeline ${isArabic ? "rtl" : "ltr"}`}>
        {historyData.map((item, index) => (
          <motion.div
            key={index}
            className={`timeline__event timeline__event--type${(index % 3) + 1}`}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="timeline__event__icon">
              <img
                className="timeline__event__image"
                src={item.image}
                alt="history"
              />
            </div>

            <div className="timeline__event__date">{item.date}</div>
            <div className="timeline__event__content">
              <div className="timeline__event__title">
                {item.title[isArabic ? "ar" : "en"]}
              </div>
              <div className="timeline__event__description">
                <div
                  dangerouslySetInnerHTML={{
                    __html: item.content[isArabic ? "ar" : "en"],
                  }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

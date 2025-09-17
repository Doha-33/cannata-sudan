"use client";
import React from "react";
import "./Home8.css";

export default function FlipClient({ historyData = [], isArabic = false }) {
  return (
    <div>
      <h1
        className="pt-5 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {isArabic ? "تاريخنا" : "OUR HISTORY"}
      </h1>

      <div className="flip-grid">
        {historyData.map((item, idx) => (
          <div className="flip-card" key={idx}>
            <div className="flip-inner">
              <div className="flip-front">
                <img src={item.image} alt={item.title?.en || "history"} />
                <div className="f-title">
                  {item.title[isArabic ? "ar" : "en"]}
                </div>
              </div>
              <div className="flip-back">
                <div className="f-date">{item.date}</div>
                <div
                  className="f-desc"
                  dangerouslySetInnerHTML={{
                    __html: item.content[isArabic ? "ar" : "en"],
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

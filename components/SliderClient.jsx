"use client";

import React, { useRef, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import "./Slider.css";
export default function SliderClient({ slides }) {
  const slideRef = useRef(null);
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const router = useRouter();

  const handleNext = () => {
    const items = slideRef.current.querySelectorAll(".item");
    slideRef.current.appendChild(items[0]);
  };

  const handlePrev = () => {
    const items = slideRef.current.querySelectorAll(".item");
    slideRef.current.prepend(items[items.length - 1]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="cannata-slider">
      <div className="slide" ref={slideRef}>
        {slides.map(
          (slide, index) =>
            slide &&
            slide.title &&
            slide.desc &&
            slide.btn_text && (
              <div
                key={slide.id}
                className={`item ${index === 0 ? "active" : ""}`}
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div
                  className="content"
                  style={{
                    textAlign: isArabic ? "right" : "left",
                  }}
                >
                  <div className="name">
                    {isArabic ? slide.title.ar : slide.title.en}
                  </div>
                  <div className="des">
                    {isArabic ? slide.desc.ar : slide.desc.en}
                  </div>
                  <button
                    className="btn text-light"
                    style={{ backgroundColor: "rgb(46, 43, 111)" }}
                    onClick={() => router.push(`/${i18n.language}/services`)}
                  >
                    {isArabic ? slide.btn_text.ar : slide.btn_text.en}
                  </button>
                </div>
              </div>
            )
        )}
      </div>

      <div className="button mb-5" style={{ direction: "ltr" }}>
        <button className="prev" onClick={isArabic ? handleNext : handlePrev}>
          <FaArrowLeft />
        </button>
        <button className="next" onClick={isArabic ? handlePrev : handleNext}>
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
}

"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function TeamSlider({ team, locale }) {
  const isArabic = locale === "ar";

  return (
    <>
      <div className="btn">
        {isArabic ? (
          <>
            <div className="swiper-button-prevs">
              <img
                className="arrow-left"
                src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/Path.svg"
                alt="left-arrow"
              />
            </div>
            <div className="swiper-button-nexts">
              <img
                className="arrow-right"
                src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/Path.svg"
                alt="right-arrow"
              />
            </div>
          </>
        ) : (
          <>
            <div className="swiper-button-nexts">
              <img
                className="arrow-right"
                src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/Path.svg"
                alt="right-arrow"
              />
            </div>
            <div className="swiper-button-prevs">
              <img
                className="arrow-left"
                src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/Path.svg"
                alt="left-arrow"
              />
            </div>
          </>
        )}
      </div>

      <Swiper
        modules={[Navigation, Pagination]}
        navigation={{
          nextEl: ".swiper-button-nexts",
          prevEl: ".swiper-button-prevs",
        }}
        loop={true}
        spaceBetween={10}
        breakpoints={{
          250: { slidesPerView: 1.2, spaceBetween: 80 },
          300: { slidesPerView: 1.2, spaceBetween: 0 },
          400: { slidesPerView: 1.5, spaceBetween: 20 },
          640: { slidesPerView: 2, spaceBetween: 40 },
          840: { slidesPerView: 3, spaceBetween: 40 },
          1150: { slidesPerView: 5, spaceBetween: 40 },
        }}
        className="team-swiper"
      >
        {team.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="card mb-3">
              <img
                className="team-member-image"
                src={item.image}
                alt="team-member"
              />
              <p className="name">{item.title[isArabic ? "ar" : "en"]}</p>
              <p className="position">{item.content[isArabic ? "ar" : "en"]}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

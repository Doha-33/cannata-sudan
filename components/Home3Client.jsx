"use client";

import { useTranslation } from "react-i18next";
import "./Home3.css";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useRouter } from "next/navigation";
import "swiper/css";
import "swiper/css/navigation";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export default function Home3Client({ locale, services }) {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const isArabic = locale == "ar";
  return (
    <div
      className={`bg-light ${isArabic ? "ar" : ""} py-lg-5`}
    >
      <h1 style={{ textAlign: "center", padding: "30px" }}>
        {t("OUR CORE SERVICES")}
      </h1>

      {/* <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className={`bg-light ${isArabic ? "ar" : ""}`}
      >
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={0}
          slidesPerView={3}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {services?.map((item, index) => (
            <SwiperSlide key={item.id}>
              <motion.div
                style={{ cursor: "pointer" }}
                className="SERVICES my-5"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: index * 0.4 }}
              >
                <img className="img1" src={item.image} alt={item.image_alt} />
                <div
                  style={{
                    position: "absolute",
                    height: "50%",
                    width: "100%",
                    bottom: "5%",
                    left: "15%",
                  }}
                >
                  <div className="icon">
                    <img src={item.icon} alt="" />
                  </div>
                  <div className="service-border"></div>

                  <div
                    onClick={() => router.push(`/${i18n.language}/services/${item.id}`)}
                    className="service-content"
                  >
                    <h5>
                      {item.title ? item.title[isArabic ? "ar" : "en"] : ""}
                    </h5>
                    <div
                      className="service-description"
                      dangerouslySetInnerHTML={{
                        __html: item.description
                          ? item.description[isArabic ? "ar" : "en"]
                          : "",
                      }}
                    ></div>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div> */}

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className={`bg-light ${isArabic ? "ar" : ""} mt-5`}
      >
        <div className="ser-grid container">
          {services?.map((item) => (
            <motion.div
              key={item.id}
              onClick={() => router.push(`/${locale}/services/${item.id}`)}
              style={{ cursor: "pointer" }}
              className="SERVICES"
              initial={{ opacity: 0, scale: 0.95, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              whileHover={{
                scale: 1.05,
                y: -10,
                boxShadow: "0 15px 25px rgba(0,0,0,0.2)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              <img className="img1" src={item.image} alt={item.image_alt} />
              <div
                style={{
                  position: "relative",
                  height: "50%",
                  width: "100%",
                  bottom: "-45%",
                  left: "15%",
                }}
              >
                <div className="icon">
                  <img src={item.icon} alt="" />
                </div>
                <div className="service-border"></div>

                <div className="service-content">
                  <h5 className="service-title">
                    {item.title ? item.title[isArabic ? "ar" : "en"] : ""}
                  </h5>
                  <div
                    className="service-description"
                    dangerouslySetInnerHTML={{
                      __html: item.description
                        ? item.description[isArabic ? "ar" : "en"]
                        : "",
                    }}
                  ></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

'use client';

import { useTranslation } from "react-i18next";
import "./Home6.css";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Link from "next/link";
import motion from "./motionClient";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export default function Home6Client({locale, posts }) {
  const { t, i18n } = useTranslation();
  const isArabic = locale == "ar"
  return (
    <motion.div
      className="post-slider-container"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <h2 className="mb-5" style={{ textAlign: "center" }}>
        {t("Latest Blogs")}
      </h2>

      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={20}
        slidesPerView={4}
        dir={isArabic ? "rtl" : "ltr"}
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
      >
        {posts.map((post) => (
          <SwiperSlide key={post.id}>
            <div className="post-card mb-3" dir={isArabic ? "rtl" : "ltr"}>
              <div className="image-container">
                <img
                  src={post.image}
                  alt={post.image_alt}
                  className="top-image"
                />
                <div className="date-banner">{post.created_at}</div>
              </div>

              <div className="card-content">
                <h3 style={{ color: "rgb(45, 44, 111)" }} className="post-title">
                  {isArabic ? post.title.ar : post.title.en}
                </h3>

                <div className="line-separator">
                  <div className="line-fill"></div>
                </div>

                <p
                  className="excerpt"
                  dangerouslySetInnerHTML={{
                    __html: isArabic ? post.content.ar : post.content.en,
                  }}
                ></p>

                <Link href={`/${i18n.language}/blogs/${post.slug}`} className="read-more">
                  {t("Read More")} <span>&#8250;</span>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
}

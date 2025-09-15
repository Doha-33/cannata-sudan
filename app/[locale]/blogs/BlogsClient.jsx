"use client";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import Link from "next/link";
import "./blogs.css";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export default function BlogsClient({ posts, locale }) {
  const { t, i18n } = useTranslation();
  const isArabic = locale === "ar";

  return (
    <>

      <div
        className="posts-grid-container my-5"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          padding: "0 20px",
          direction: isArabic ? "rtl" : "ltr",
        }}
      >
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            className="post-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="image-container">
              <img
                src={post.image}
                alt={post.image_alt}
                className="top-image"
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
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
                  __html: post.content[isArabic ? "ar" : "en"],
                }}
              ></p>

              <Link
                href={`/${locale}/blogs/${post.slug}`}
                className="read-more"
              >
                {t("Read More")} <span>&#8250;</span>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}

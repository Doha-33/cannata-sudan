"use client";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import Link from "next/link";
import "./blogs.css";

export default function BlogsClient({ posts, locale }) {
  const { t } = useTranslation();
  const isArabic = locale === "ar";

  return (
    <div
      className="blogs-grid my-5"
      style={{ direction: isArabic ? "rtl" : "ltr" }}
    >
      {posts.map((post, index) => (
        <motion.div
          key={post.id}
          className="blog-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <div className="blog-img-container">
            <img src={post.image} alt={post.image_alt} className="blog-img" />
          </div>

          <div className="blog-content">
            <h3 className="blog-title">
              {isArabic ? post.title.ar : post.title.en}
            </h3>
            <p
              className="blog-excerpt"
              dangerouslySetInnerHTML={{
                __html: post.content[isArabic ? "ar" : "en"],
              }}
            ></p>
            <Link href={`/${locale}/blogs/${post.slug}`} className="blog-btn">
              {t("Read More")}
            </Link>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

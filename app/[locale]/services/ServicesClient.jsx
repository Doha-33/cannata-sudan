"use client";
import { useTranslation } from "react-i18next";
import "./services.css";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import PageServerHeader from "@/components/PageHeaderServer";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export default function ServicesClient({ services, locale }) {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const router = useRouter();

  return (
    <div>
      {/* <PageServerHeader titleKey={"services"} /> */}

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

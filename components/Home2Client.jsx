"use client";
import { useTranslation } from "react-i18next";
import motion from "./motionClient";
import { useRouter } from "next/navigation";
import { IoIosArrowForward, IoMdArrowRoundForward } from "react-icons/io";
import { FiPhoneCall } from "react-icons/fi";
const Home2 = ({ about }) => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const router = useRouter();

  return (
    <div className="container-fluid mt-5 pt-5" dir={isArabic ? "rtl" : "ltr"}>
      <div className="row">
        <motion.div
          className={`col-12 col-md-6 text-center ${
            isArabic ? "order-2 order-md-1" : "order-1 order-md-1"
          }`}
          initial={{ opacity: 0, x: isArabic ? 150 : -150 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <span
            className="rounded-4 p-1 badge"
            style={{
              background: "rgb(224,45,37)",
              width: "fit-content",
              color: "white",
            }}
          >
            {t("ABOUT CANNATA INTAERNATIONAL")}
          </span>

          <h1 style={{ color: "rgb(45,43,111)" }}>
            {t("Total Logistics Solution")}
          </h1>
          <div
            dangerouslySetInnerHTML={{
              __html: about?.about[isArabic ? "ar" : "en"] || "",
            }}
          />
          <div
            className="d-flex items-center justify-between mt-4 rounded div-damage"
            style={{
              width: "40%",
              // boxShadow: "1px 1px 10px gray",
              // backgroundColor: "white",
              height: "200px",
              color: "rgb(25, 24, 63)",
              fontWeight: "bold",
            }}
          >
            <div className="d-flex justify-between w-100 h-100 intermodal-box">
              <div
                style={{
                  className: "line",
                  backgroundColor: "rgb(224,45,37)",
                  color: "white",
                  width: "1%",
                  height: "100%",
                }}
              ></div>

              <div className="d-flex flex-column justify-content-center align-items-start">
                <p>
                  <IoIosArrowForward /> {t("High Experience")}
                </p>
                <p>
                  <IoIosArrowForward /> {t("Clients Satisfaction")}
                </p>
                <p>
                  <IoIosArrowForward /> {t("Professional Teams")}
                </p>
                <p>
                  <IoIosArrowForward /> {t("Best Solutions")}
                </p>
              </div>
            </div>
          </div>
          <button
            type="button"
            className="btn my-3"
            style={{
              color: "white",
              backgroundColor: "rgb(191, 5, 22)",
            }}
            onClick={() => router.push(`${i18n.language}/contact`)}
          >
            {t("Contact Us")}
          </button>
        </motion.div>

        <motion.div
          className={`col-12 col-md-6 position-relative px-1 ${
            isArabic ? "order-1 order-md-2" : "order-2 order-md-2"
          } triangle-sec d-none d-md-block`}
          initial={{ opacity: 0, x: isArabic ? -150 : 150 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true, amount: 0.3 }}
        ></motion.div>
      </div>
    </div>
  );
};

export default Home2;

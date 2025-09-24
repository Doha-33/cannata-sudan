"use client";

import { useTranslation } from "react-i18next";
import "./Home7.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
// export const dynamic = "force-dynamic";
export const revalidate = 0;
// حمل الماب ديناميك لكن من غير مشاكل SSR
const MapComponent = dynamic(() => import("../components/MapComponent"), {
  ssr: false,
});

export default function Home7Client({ isArabic }) {
  const { t, i18n } = useTranslation();

  // force render بعد mount (عشان الماب تضمن تترندر)
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // أو loader بسيط
  }

  return (
    <div className="contact">
      <motion.div
        className="div22"
        initial={{ opacity: 0, x: -150 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5 }}
      >
        <h2 style={{ textAlign: "center", padding: "2%", color: "white" }}>
          {t("Request A Quote")}
        </h2>

        <Form onSubmit={(e) => e.preventDefault()}>
          <div className="d-flex justify-content-center w-100 form-group">
            <Form.Group
              className={`${isArabic ? "ms-3" : "me-3"} w-50 my-1 `}
              controlId="formBasicName"
            >
              <Form.Label>{t("Your Name:")}</Form.Label>
              <Form.Control type="text" />
            </Form.Group>

            <Form.Group
              className={`${isArabic ? "me-3" : "ms-3"} w-50 my-1`}
              controlId="formBasicPhone"
            >
              <Form.Label>{t("Phone No:")}</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
          </div>

          <Form.Group className="w-100" controlId="formBasicEmail">
            <Form.Label>{t("Your Email:")}</Form.Label>
            <Form.Control type="email" />
          </Form.Group>

          <Form.Group className="w-100" controlId="formBasicDescription">
            <Form.Label>
              {i18n.language === "ar" ? "الوصف:" : "Description"}
            </Form.Label>
            <Form.Control className="py-5" type="text" />
          </Form.Group>

          <Button
            className="my-3 btn d-flex justify-content-center align-items-center"
            style={{
              width: "100%",
              backgroundColor: "rgb(45, 44, 111)",
              border: "none",
              cursor: "pointer",
              textAlign: "center",
            }}
            variant="primary"
            type="submit"
          >
            <span>{t("Submit Request")}</span>
          </Button>
        </Form>
      </motion.div>

    </div>
  );
}

"use client";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "./contact.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { createAPI } from "../../../Services/APIs";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
// export const dynamic = "force-dynamic";
export const revalidate = 0;
export default function ContactClient({ setting, locale }) {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const MapComponent = dynamic(
    () => import("../../../components/MapComponent"),
    {
      ssr: false,
    }
  );
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createAPI("contact", formData);
      alert(t("Message sent successfully!"));
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      alert(t("Something went wrong", err));
    }
  };

  return (
    <div>
      <motion.div
        className="touch pt-4"
        dir={isArabic ? "rtl" : "ltr"}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        <h2 className="py-3">{t("Get In Touch")}</h2>
        <div className="call-divs">
          <div className="call py-3">
            <img src="/images/Frame14.png" style={{ width: "18%" }} alt="" />
            <h5>{t("Call Us")}</h5>
            <div className="text-danger d-flex flex-column">
              <span>{setting?.phone}</span>
              <span>{setting?.phone_two}</span>
            </div>
          </div>

          <div className="call py-3">
            <img src="/images/Frame13.png" style={{ width: "18%" }} alt="" />
            <h5>{t("Email")}</h5>
            <div className="text-danger d-flex flex-column">
              <span>{setting?.email}</span>
              <span>{setting?.email_two}</span>
            </div>
          </div>

          <div className="call py-3">
            <img src="/images/Frame13(1).png" style={{ width: "18%" }} alt="" />
            <h5>{t("Address")}</h5>
            <div className="m-1 text-danger d-flex flex-column">
              {setting?.locations?.map((location, index) => (
                <span className="location" key={index}>
                  {isArabic ? location.name.ar : location.name.en}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        style={{ width: "100%" }}
        initial={{ opacity: 0, x: 150 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <MapComponent />
      </motion.div>
      <div className="cont">
        <motion.div
          className="form-container"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div>
            <h2>{t("Have Any Questions?")}</h2>

            <Form onSubmit={handleSubmit}>
              <div className="d-flex flex-column flex-md-row justify-content-between w-100">
                <Form.Group
                  className={`my-2 ${isArabic ? "ms-md-2" : "me-md-2"} w-100`}
                >
                  <Form.Label>{t("Your Name:")}</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group
                  className={`my-2 ${isArabic ? "ms-md-2" : "me-md-2"} w-100`}
                >
                  <Form.Label>{t("Your Email:")}</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </div>

              <div className="d-flex flex-column flex-md-row justify-content-between w-100">
                <Form.Group
                  className={`my-2 ${isArabic ? "ms-md-2" : "me-md-2"} w-100`}
                >
                  <Form.Label>{t("Phone No:")}</Form.Label>
                  <Form.Control
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group
                  className={`my-2 ${isArabic ? "ms-md-2" : "me-md-2"} w-100`}
                >
                  <Form.Label>{isArabic ? "الموضوع:" : "Subject:"}</Form.Label>
                  <Form.Control
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </div>

              <Form.Group className="my-3">
                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder={t("Message")}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Button
                className="my-3 w-100"
                style={{
                  backgroundColor: "rgb(200, 35, 56)",
                  border: "none",
                  textAlign: "center",
                }}
                type="submit"
              >
                {isArabic ? "إرسال" : "Submit"}
              </Button>
            </Form>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <img src="/images/Container.png" alt="" className="img-fluid" style={{maxHeight:"500px"}} />
        </motion.div>
      </div>
    </div>
  );
}

"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Faqs({ faqs = [], isArabic }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div
      className="faqs-container"
      dir={isArabic ? "rtl" : "ltr"}
      style={{ marginTop: "30px" }}
    >
      <h2>FAQs</h2>

      {Array.isArray(faqs) && faqs.map((faq, index) => (
        <div key={faq.id} className="faq-item" style={{ marginBottom: "15px" }}>
          <div
            className="faq-question"
            onClick={() => toggleFAQ(index)}
            style={{
              cursor: "pointer",
              fontWeight: "bold",
              background: "#eee",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            {faq.title?.[isArabic ? "ar" : "en"]}
          </div>

          <AnimatePresence initial={false}>
            {activeIndex === index && (
              <motion.div
                key={index}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{ overflow: "hidden" }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="faq-answer"
                  style={{
                    padding: "10px",
                    background: "#f9f9f9",
                    borderRadius: "5px",
                    marginTop: "5px",
                  }}
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: faq.content?.[isArabic ? "ar" : "en"] || "",
                    }}
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

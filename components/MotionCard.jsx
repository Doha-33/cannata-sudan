"use client";
import "./Home9.css";
import motion from "./motionClient";

export default function MotionCard({ children, index }) {
  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

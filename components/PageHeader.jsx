"use client";
import React from "react";
import { useTranslation } from "react-i18next";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export default function PageHeader({ titleKey, img }) {
  
  
  const { t } = useTranslation();
  console.log("titlekey",titleKey);
  
  return (
    <div className="serv" style={{backgroundImage: `url(${img})`}}>
      <div className="container">
        <h1>{t(titleKey)}</h1>
        <p>
          {t("home")} / {t(titleKey)}
        </p>
      </div>
    </div>
  );
}
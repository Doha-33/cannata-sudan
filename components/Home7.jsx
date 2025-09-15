"use client";

import nextDynamic from "next/dynamic"; 
export const dynamic = "force-dynamic";
export const revalidate = 0;
import Home7Client from "./Home7Client";

const MapComponent = nextDynamic(() => import("../components/MapComponent"), {
  ssr: false,
});

export default function Home7({ locale }) {
  const isArabic = locale === "ar";

  return (
    <div className="d-flex align-items-center justify-content-center">
      <Home7Client  isArabic={isArabic} />
      <MapComponent />
    </div>
  );
}

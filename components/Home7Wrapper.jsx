"use client";

import dynamic from "next/dynamic";

// ✅ هنا ينفع نستخدم ssr: false لأن دا Client Component
const Home7 = dynamic(() => import("@/components/Home7"), { ssr: false });

export default function Home7Wrapper(props) {
  return <Home7 {...props} />;
}
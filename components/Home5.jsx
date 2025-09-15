import Home5Client from "./Home5Client";
import ApiClient from "@/Services/APIs";

export default async function Home5({ locale }) {
  let testimonials = [];

  try {
    const res = await ApiClient.get("testimonial");
    if (res.data) {
      testimonials = res.data;
    }
  } catch (error) {
    console.error("Error fetching testimonials:", error);
  }

  const isArabic = locale === "ar";
  return <Home5Client isArabic={isArabic} testimonials={testimonials} />;
}

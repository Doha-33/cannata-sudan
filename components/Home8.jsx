import ApiClient from "@/Services/APIs";
import Home8Client from "./Home8Client";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export default async function Home8({ locale }) {
  try {
    const res = await ApiClient.get("about");
    const historyData = res.data.histories || [];
    const isArabic = locale === "ar";

    return <Home8Client historyData={historyData} isArabic={isArabic} />;
  } catch (error) {
    console.error("Error fetching about data:", error);
    return <div>Failed to load history</div>;
  }
}

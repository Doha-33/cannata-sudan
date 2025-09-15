import Home4Client from "./Home4Client";
import ApiClient from "@/Services/APIs";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export default async function Home4({ locale }) {
  let items = [];

  try {
    const res = await ApiClient.get("why");
    if (res.data) {
      items = res.data;
    }
  } catch (error) {
    console.error("Error fetching why choose us data:", error);
  }

  const isArabic = locale === "ar";
  return <Home4Client isArabic={isArabic} items={items} />;
}

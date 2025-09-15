import Home3Client from "./Home3Client";
import ApiClient from "@/Services/APIs";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export default async function Home3({ locale }) {
  let services = [];

  try {
    const res = await ApiClient.get("service");
    if (res.data) {
      services = res.data;
    }
  } catch (error) {
    console.error("Error fetching services data:", error);
  }

  return <Home3Client locale={locale} services={services} />;
}

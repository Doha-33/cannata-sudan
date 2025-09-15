import "./Home9.css";
import ApiClient from "@/Services/APIs";
import MotionCard from "./MotionCard";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export default async function Home9({ locale }) {
  const items = (await ApiClient.get("how"))?.data || [];
  const isArabic = locale === "ar";

  return (
    <div className="py-5">
      <h1 className="text-center">{isArabic ? "كيف نعمل" : "How we work"}</h1>
      <div className="grid-container">
        {Array.isArray(items) &&
          items.map((item, index) => (
            <MotionCard key={index} index={index}>
              <div className="title">{item.title[isArabic ? "ar" : "en"]}</div>
              <div
                className="content"
                dangerouslySetInnerHTML={{
                  __html: item.content[isArabic ? "ar" : "en"],
                }}
              />
            </MotionCard>
          ))}
      </div>
    </div>
  );
}

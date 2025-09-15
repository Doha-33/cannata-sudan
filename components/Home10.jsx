import "./Home10.css";
import ApiClient from "../Services/APIs";
import TeamSlider from "./TeamSlider";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export default async function Home10({ locale }) {
  const team = (await ApiClient.get("team")).data || [];

  return (
    <div className="responsive-container-block outer-container">
      <div className="responsive-container-block inner-container">
        <h1 className="text-blk heading-text">
          {locale === "ar" ? "فريق CANNATA" : "CANNATA Team"}
        </h1>
        <div className="responsive-container-block card-container">
          <TeamSlider team={team} locale={locale} />
        </div>
      </div>
    </div>
  );
}

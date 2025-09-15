import Home6 from "@/components/Home6";
import Home7 from "@/components/Home7";
import Home8 from "@/components/Home8";
import Home10 from "@/components/Home10";
import "./about.css";
import AboutClient2 from "./AboutClient2";
import PageServerHeader from "@/components/PageHeaderServer";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export default function AboutClient({ about, locale }) {
  return (
    <div>
      <PageServerHeader titleKey="about"  />
      <Home8 locale={locale} />
      <AboutClient2 about={about} locale={locale} />
      <Home10 locale={locale} />
      {/* <Home6 locale={locale} /> */}
      <Home7 locale={locale} />
    </div>
  );
}

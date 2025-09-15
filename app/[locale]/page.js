import Home1 from "../../components/Home1";
import Home2 from "@/components/Home2";
import "./page.module.css";
import Home3 from "@/components/Home3";
import Home6 from "@/components/Home6";
import Home7Wrapper from "@/components/Home7Wrapper";
import Home8 from "@/components/Home8";
import Home9 from "@/components/Home9";
import Home10 from "@/components/Home10";
import seoConfig from "@/config/seoConfig";

export async function generateMetadata({ params }) {
  const locale = params.locale;
  const seo = seoConfig.home[locale] || seoConfig.home.en;

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      languages: {
        en: seoConfig.home.en.url,
        ar: seoConfig.home.ar.url,
      },
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: seo.url,
      siteName: "Cannata",
      locale: locale === "ar" ? "ar_EG" : "en_US",
      type: "website",
    },
  };
}
export default function Page({ params }) {
  return (
    <div>
      <Home1 locale={params.locale} />
      <Home2 locale={params.locale} />
      <Home8 locale={params.locale} />
      {/* <Home9 locale={params.locale} /> */}
      <Home3 locale={params.locale} />
      {/* <Home6 locale={params.locale} /> */}
      <Home10 locale={params.locale} />
      <Home7Wrapper locale={params.locale} />
    </div>
  );
}

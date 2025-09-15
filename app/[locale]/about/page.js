import ApiClient from "@/Services/APIs";
import AboutClient from "./AboutClient";
import seoConfig from "@/config/seoConfig";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export async function generateMetadata({ params }) {
  const locale = params.locale;
  const seo = seoConfig.about[locale] || seoConfig.about.en;

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      languages: {
        en: seoConfig.about.en.url,
        ar: seoConfig.about.ar.url,
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
export default async function AboutPage({ params }) {
  const res = await ApiClient.get("about");
  const about = res?.data || [];
  const locale = params.locale;


  return <AboutClient about={about} locale={locale} />;
}

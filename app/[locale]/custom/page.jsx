import Home4 from "../../../components/Home4";
import Home9 from "../../../components/Home9";
import PageHeader from "@/components/PageHeader";
import ApiClient from "@/Services/APIs";
import Faqs from "@/components/Faqs";
import "./custom.css";
import seoConfig from "@/config/seoConfig";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export async function generateMetadata({ params }) {
  const locale = params.locale;
  const seo = seoConfig.customClearance[locale] || seoConfig.customClearance.en;

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      languages: {
        en: seoConfig.customClearance.en.url,
        ar: seoConfig.customClearance.ar.url,
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
export default async function Custom({ params }) {
  const res = await ApiClient.get("faqs");
  const faqs = res?.data || [];
  const isArabic = params.locale === "ar";

  return (
    <div>
      <PageHeader titleKey={"Custom Clearnace"} />
      <Home4 locale={params.locale} />
      <Home9 locale={params.locale} />

      <Faqs faqs={faqs} isArabic={isArabic} />
    </div>
  );
}

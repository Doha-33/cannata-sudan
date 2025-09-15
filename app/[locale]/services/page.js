import ApiClient from "@/Services/APIs";
import ServicesClient from "./ServicesClient";
import seoConfig from "@/config/seoConfig";
import PageServerHeader from "@/components/PageHeaderServer";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export async function generateMetadata({ params }) {
  const locale = params.locale;
  const seo = seoConfig.services[locale] || seoConfig.services.en;

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      languages: {
        en: seoConfig.services.en.url,
        ar: seoConfig.services.ar.url,
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
export default async function ServicesPage({ params }) {
  const res = await ApiClient.get("service");
  const services = res?.data || [];

  return (
    <>
      <PageServerHeader titleKey={"service"} />

      <ServicesClient services={services} locale={params.locale || "en"} />
    </>
  );
}

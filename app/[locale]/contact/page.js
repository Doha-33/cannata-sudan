import ApiClient from "../../../Services/APIs";
import ContactClient from "./ContactClient";
import seoConfig from "@/config/seoConfig";
import PageServerHeader from "@/components/PageHeaderServer";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export async function generateMetadata({ params }) {
  const locale = params.locale;
  const seo = seoConfig.contact[locale] || seoConfig.contact.en;

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      languages: {
        en: seoConfig.contact.en.url,
        ar: seoConfig.contact.ar.url,
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
export default async function ContactServer({ locale }) {
  let setting = null;

  try {
    const res = await ApiClient.get("setting");
    setting = res?.data;
  } catch (error) {
    console.error("Error fetching settings:", error);
  }

  return (
    <>
      <PageServerHeader titleKey="contact" />
      <ContactClient setting={setting} locale={locale} />
    </>
  );
}

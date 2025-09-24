import TrackingClient from "./editprofile";
import seoConfig from "@/config/seoConfig";

export async function generateMetadata({ params }) {
  const locale = params.locale;
  const seo = seoConfig.tracking[locale] || seoConfig.tracking.en;

  
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      languages: {
        en: seoConfig.tracking.en.url,
        ar: seoConfig.tracking.ar.url,
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

export default async function TrackingServer({ params }) {
  const locale = params.locale;
  return <TrackingClient locale={locale} />;
}

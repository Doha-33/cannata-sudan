import "./gallery.css";
import PageServerHeader from "@/components/PageHeaderServer";
import seoConfig from "@/config/seoConfig";
import ApiClient from "@/Services/APIs";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export async function generateMetadata({ params }) {
  const locale = params.locale;
  const seo = seoConfig.gallery[locale] || seoConfig.gallery.en;

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      languages: {
        en: seoConfig.gallery.en.url,
        ar: seoConfig.gallery.ar.url,
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

const Gallery = async () => {
  // جلب الصور من API
  const res = await ApiClient.get("gallery");
  const images = res?.data || [];

  return (
    <>
      <PageServerHeader titleKey="gallary"/>
      <div className="gallery my-5">
        {images.map((item, index) => (
          <img key={index} src={item.image} alt={`gallery-${index}`} />
        ))}
      </div>
    </>
  );
};

export default Gallery;

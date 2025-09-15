import ApiClient from "@/Services/APIs";
import BlogsClient from "./BlogsClient";
import seoConfig from "@/config/seoConfig";
import PageServerHeader from "@/components/PageHeaderServer";

export async function generateMetadata({ params }) {
  const locale = params.locale;
  const seo = seoConfig.blogs[locale] || seoConfig.blogs.en;

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      languages: {
        en: seoConfig.blogs.en.url,
        ar: seoConfig.blogs.ar.url,
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
export default async function BlogsPage({ params }) {
  const res = await ApiClient.get("article");
  let posts = [];

  if (res?.status && res?.data) {
    posts = res.data.filter((post) => post.is_published === true);
  }

  return (
    <>
      <PageServerHeader titleKey="blog" />

      <BlogsClient posts={posts} locale={params.locale || "en"} />
    </>
  );
}

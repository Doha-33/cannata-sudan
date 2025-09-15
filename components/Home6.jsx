import Home6Client from "./Home6Client";
import ApiClient from "@/Services/APIs";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export default async function Home6({ locale }) {
  let posts = [];

  try {
    const res = await ApiClient.get("article") || [];
    if (res.status && res.data) {
      posts = res.data.filter((post) => post.is_published === true);
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
  }

  return <Home6Client locale={locale} posts={posts} />;
}

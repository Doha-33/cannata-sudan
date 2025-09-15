import PageServerHeader from "@/components/PageHeaderServer";
import { getAPI } from "../../../../Services/APIs";
import "./blogDetails.css";

const BlogDetailsPage = async ({ params }) => {
  const { slug, locale } = params;
  const isArabic = locale === "ar";

  const res = await getAPI("article");
  const posts = res?.data?.data || [];
  const post = posts.find((post) => post.slug === slug);

  if (!post) {
    return (
      <div className="not-found">
        {isArabic ? "لم يتم العثور على المقال" : "Post not found"}
      </div>
    );
  }

  const latestPosts = posts.slice(0, 3);

  return (
    <>
      <PageServerHeader titleKey="blog" />

      <div className="container blog-details" dir={isArabic ? "rtl" : "ltr"}>
        <div className="blog-main">
          <img
            src={post.image}
            alt={post.image_alt}
            className="blog-main-img"
          />
          <h2 className="blog-title">{post.title[isArabic ? "ar" : "en"]}</h2>
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{
              __html: post.content[isArabic ? "ar" : "en"],
            }}
          />
        </div>

        {/* Sidebar */}
        <aside className="blog-sidebar">
          <h3>{isArabic ? "آخر المقالات" : "Latest Blogs"}</h3>
          {latestPosts.map((blog) => (
            <div key={blog.id} className="sidebar-card">
              {blog.image && (
                <img
                  src={blog.image}
                  alt={blog.image_alt || ""}
                  className="sidebar-img"
                />
              )}
              <div>
                <h5>{blog.title?.[isArabic ? "ar" : "en"] || "No Title"}</h5>
                <p
                  dangerouslySetInnerHTML={{
                    __html:
                      blog.content?.[isArabic ? "ar" : "en"]?.slice(0, 80) ||
                      "",
                  }}
                />
              </div>
            </div>
          ))}
        </aside>
      </div>
    </>
  );
};

export default BlogDetailsPage;

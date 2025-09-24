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

      <div className="blog-details-container" dir={isArabic ? "rtl" : "ltr"}>
        <div className="blog-content-area">
          <div className="blog-cover">
            <img src={post.image} alt={post.image_alt} />
          </div>
          <h2 className="blog-title">{post.title[isArabic ? "ar" : "en"]}</h2>
          <div
            className="blog-text"
            dangerouslySetInnerHTML={{
              __html: post.content[isArabic ? "ar" : "en"],
            }}
          />
        </div>

        <aside className="blog-latest">
          <h3>{isArabic ? "آخر المقالات" : "Latest Blogs"}</h3>
          <div className="latest-grid">
            {latestPosts.map((blog) => (
              <div key={blog.id} className="latest-card">
                {blog.image && (
                  <img
                    src={blog.image}
                    alt={blog.image_alt || ""}
                    className="latest-img"
                  />
                )}
                <h5>{blog.title?.[isArabic ? "ar" : "en"] || "No Title"}</h5>
                <p
                  dangerouslySetInnerHTML={{
                    __html:
                      blog.content?.[isArabic ? "ar" : "en"]?.slice(0, 60) ||
                      "",
                  }}
                />
              </div>
            ))}
          </div>
        </aside>
      </div>
    </>
  );
};

export default BlogDetailsPage;

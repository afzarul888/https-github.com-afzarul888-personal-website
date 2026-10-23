import { posts } from "../../config";
import { requireAdmin } from "../../lib/requireAdmin";
import { BlogHub } from "../../blog/BlogHub";

export default async function AdminBlog() {
  await requireAdmin();
  return <BlogHub publishedPosts={posts} showUploader />;
}

import { posts } from "../config";
import { BlogHub } from "./BlogHub";

export default function Blog() {
  return <BlogHub publishedPosts={posts} />;
}

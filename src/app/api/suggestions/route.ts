// based on current post tags
// suggest similar posts

import { Post, allPosts } from "contentlayer/generated";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug");
  const post = allPosts.find((post) => post.slug === slug);

  if (!post) {
    return NextResponse.json({ message: "Post not found" }, { status: 404 });
  }

  const suggestions = allPosts.filter(filterSimilar(post)).slice(0, 3);

  return NextResponse.json(suggestions);
}

const getTags = (post: Pick<Post, "tags">) =>
  post.tags.split(",").map((tag) => tag.trim());

function filterSimilar({ tags, slug }: Post) {
  return (post: Post) =>
    post.slug !== slug &&
    getTags(post).some((tag) => getTags({ tags }).includes(tag));
}

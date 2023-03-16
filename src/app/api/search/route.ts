import { allPosts } from "contentlayer/generated";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const tags = request.nextUrl.searchParams.get("tags");
  const query = request.nextUrl.searchParams.get("q");

  const posts = allPosts.filter((post) => {
    if (tags) {
      const tagsArray = tags.split(",").map((t) => t.trim());
      return tagsArray.every((tag) => post.tags.includes(tag.trim()));
    }

    if (query) {
      return post.title
        .toLowerCase()
        .trim()
        .includes(query.toLowerCase().trim());
    }

    return true;
  });

  return NextResponse.json({
    data: posts,
    count: posts.length,
  });
}

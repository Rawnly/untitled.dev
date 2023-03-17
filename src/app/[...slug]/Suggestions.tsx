"use client";

import type { Post } from "contentlayer/generated";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";

interface Props {
  post: Post;
}

export default function Suggestions({ post }: Props) {
  const { data: posts } = useSWR(
    [post.slug, "/api/suggestions"],
    ([slug, url]) =>
      fetch(`${url}?slug=${slug}`).then((r) => r.json() as Promise<Post[]>)
  );

  if (!posts || !posts.length) return null;

  return (
    <div>
      <h1 className="mb-4 text-base opacity-50">You might also like:</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 overflow-x-scroll">
        {posts?.map((post) => (
          <Link
            href={post.slug}
            className="px-4 py-2 rounded hover:rx-bg-neutral-2 transition-colors"
            key={post.slug}
          >
            <h3 className="text-lg">{post.title}</h3>
            <p className="text-sm">{post.summary}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

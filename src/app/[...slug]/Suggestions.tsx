"use client";

import clsx from "clsx";
import type { Post } from "contentlayer/generated";
import Link from "next/link";
import Balancer from "react-wrap-balancer";
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
      <div
        className={clsx(
          "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 overflow-x-scroll",
          {
            "xl:grid-cols-1": posts.length === 1,
            "xl:grid-cols-2": posts.length === 2,
          }
        )}
      >
        {posts?.map((post, idx) => (
          <Link
            href={post.slug}
            className={clsx(
              "px-4 py-2 rounded hover:rx-bg-neutral-2 transition-colors",
              {
                "xl:col-span-1 md:col-span-2": idx === 2,
              }
            )}
            key={post.slug}
          >
            <h3 className="text-lg">
              <Balancer>{post.title}</Balancer>
            </h3>
            <p className="text-sm">
              <Balancer>{post.summary}</Balancer>
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

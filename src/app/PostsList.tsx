"use client";
import { format } from "date-fns";

import type { Post } from "contentlayer/generated";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import { SearchResponse } from "./api/search/type";
import Link from "next/link";

interface Props {
  posts: Post[];
  search?: string;
  tags?: string[];
}

const makeUrl = (
  url: string,
  params: Record<string, string | string[] | undefined | null>
): string => {
  const p = Object.entries(params).reduce((acc, [key, value]) => {
    if (!value) return acc;

    if (Array.isArray(value)) {
      return {
        ...acc,
        [key]: value.join(","),
      };
    }

    return {
      ...acc,
      [key]: value,
    };
  }, {} as Record<string, string>);

  const searchParams = new URLSearchParams(p);

  return `${url}?${searchParams.toString()}`;
};

export default function PostsList({ posts = [], ...props }: Props) {
  const p = useSearchParams();
  const tags = props.tags ?? p.get("tag");
  const q = props.search ?? p.get("search");

  const { data: response } = useSWR(
    [{ tags, q }, "/api/search"],
    ([p, url]) =>
      fetch(makeUrl(url, p)).then(
        (r) => r.json() as Promise<SearchResponse<Post>>
      ),
    {
      fallbackData: {
        data: posts,
        count: posts.length,
      },
    }
  );

  return (
    <ul className="flex flex-col gap-4">
      {response.data.map((post) => (
        <Link href={post.slug} key={post.slug}>
          <li className="rounded flex items-center gap-4 justify-start hover:rx-bg-neutral-2 px-4 py-2">
            <div className="flex-1">
              <h3 className="text-xl mb-1 sm:text-2xl">{post.title}</h3>
              <p className="text-sm sm:text-base">{post.summary}</p>
            </div>
            <small className="md:hidden text-sm text-center opacity-50 min-w-[50px]">
              {format(new Date(post.date), "yyyy")} <br />
              {format(new Date(post.date), "dd MMM")}
            </small>
            <small className="ml-auto hidden md:block opacity-50">
              {format(new Date(post.date), "yyyy-MM-dd")}
            </small>
          </li>
        </Link>
      ))}
    </ul>
  );
}

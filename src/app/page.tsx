import { allPosts } from "contentlayer/generated";
import PostsList from "./PostsList";
import Link from "next/link";

export default async function Page() {
  return (
    <div>
      <div className="text-center mx-auto py-24">
        <h1 className="text-3xl mb-2.5 md:text-5xl lg:text-7xl">
          Welcome to <i>untitled</i>
        </h1>
        <p>A place where I share my daily findings</p>
        <p className="text-xs mt-1">
          by <Link href="https://fedevitale.dev">Federico Vitale</Link>
        </p>
      </div>
      <PostsList posts={allPosts} />
    </div>
  );
}

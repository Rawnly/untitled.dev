import { allPosts } from "contentlayer/generated";
import PostsList from "./PostsList";

export default async function Page() {
  return (
    <div>
      <div className="text-center mx-auto my-24">
        <h1 className="text-3xl mb-2.5 md:text-5xl lg:text-7xl">
          Welcome to <i>TIL</i>
        </h1>
        <p>A place where I share my daily findings</p>
      </div>
      <PostsList posts={allPosts} />
    </div>
  );
}

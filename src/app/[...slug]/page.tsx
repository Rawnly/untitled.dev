import { allPosts } from "contentlayer/generated";
import { notFound } from "next/navigation";
import { useMDXComponent } from "next-contentlayer/hooks";
import { findPost } from "./utils";
import * as mdxComponents from "@/components/mdx";

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default function PostPage({
  params,
}: {
  params: { slug: string | string[] };
}) {
  const post = allPosts.find(findPost(params.slug));

  if (!post) {
    console.log("Post not found");
    return notFound();
  }

  // eslint-disable-next-line
  const Component = useMDXComponent(post!.body.code);

  return (
    <main id="post-content">
      <Component components={{ ...mdxComponents }} />
      {process.env.NODE_ENV === "production" && (
        <script type="application/ld+json">
          {JSON.stringify(post.structuredData)}
        </script>
      )}
    </main>
  );
}

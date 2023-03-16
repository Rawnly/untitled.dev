import { allPosts } from "contentlayer/generated";
import { notFound } from "next/navigation";
import { useMDXComponent } from "next-contentlayer/hooks";
import { findPost } from "./utils";
import clsx from "clsx";
import { CodeBlock } from "@/components/mdx/CodeBlock";

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}

const Paragraph = ({ className, ...props }: any) => (
  <p {...props} className={clsx(className, "focusable-row")} />
);

export default function PostPage({
  params,
}: {
  params: { slug: string | string[] };
}) {
  const post = allPosts.find(findPost(params.slug));

  if (!post) {
    return notFound();
  }

  const Component = useMDXComponent(post.body.code);

  return (
    <main>
      <Component components={{ p: Paragraph, pre: CodeBlock }} />
      {process.env.NODE_ENV === "production" && (
        <script type="application/ld+json">
          {JSON.stringify(post.structuredData)}
        </script>
      )}
    </main>
  );
}

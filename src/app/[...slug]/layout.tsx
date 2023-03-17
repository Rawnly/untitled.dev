import { allPosts } from "contentlayer/generated";
import { Metadata } from "next";
import { findPost } from "./utils";
import { notFound } from "next/navigation";
import Suggestions from "./Suggestions";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: any;
}): Promise<Metadata | undefined> {
  const post = allPosts.find(findPost(params.slug));

  if (!post) {
    return;
  }

  const { title, date, summary: description, image, slug } = post;
  const ogImage = image
    ? `https://fedevitale.dev/${image}`
    : `https://fedevitale.dev/api/og?slug=${slug}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: date,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      creator: "@fedevitaledev",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default function Layout(p: any) {
  const post = allPosts.find(findPost(p.params.slug));

  if (!post) notFound();

  return (
    <>
      <nav className="sticky navbar z-[9999] backdrop-blur flex items-center justify-start gap-4 py-4 px-8 top-0">
        <div className="aboslute inset-0 z-50">
          <Link href="/">
            <h1 className="-mb-1.5">TIL</h1>
            <small>by Federico Vitale</small>
          </Link>
        </div>
      </nav>
      <div className="flex flex-col py-24 gap-8 px-4 md:px-12">
        <header className="w-full flex flex-col gap-2 text-center mb-8 sm:mb-16">
          <h1 className="md:text-5xl lg:text-6xl">{post.title}</h1>
          <p className="md:text-xl lg:text-2xl">{post.summary}</p>
          <div className="flex mt-4 text-sm flex-wrap justify-center items-center gap-4 mx-auto max-sm:text-xs">
            {post.tagsList.map((tag: string) => (
              <Link
                className="rounded transition-all opacity-25 hover:opacity-100 cursor-pointer px-2 sm:px-4 py-2 hover:rx-bg-neutral-2"
                key={tag}
                href={`/?tag=${tag}`}
              >
                #{tag}
              </Link>
            ))}
          </div>
        </header>
        <section>{p.children}</section>
        <Suggestions post={post} />
      </div>
    </>
  );
}

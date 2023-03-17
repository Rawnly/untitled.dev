import {
  defineDocumentType,
  makeSource,
  type ComputedFields,
} from "contentlayer/source-files";

import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode, { Options } from "rehype-pretty-code";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

const computedFields: ComputedFields = {
  slug: {
    type: "string",
    resolve: (doc) => doc._raw.flattenedPath,
  },
  tagsList: {
    type: "list",
    description: 'List of tags, separated by ","',
    resolve: (d) => d.tags.split(",").map((t: any) => t.trim()),
  },
  structuredData: {
    type: "json",
    resolve: (doc) => ({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: doc.title,
      datePublished: doc.date,
      dateModified: doc.date,
      description: doc.summary,
      url: `https://til.fedevitale.dev/p/${doc._raw.flattenedPath}`,
      image: doc.image
        ? `https://til.fedevitale.dev/${doc.image}`
        : `https://til.fedevitale.dev/api/og?title=${encodeURIComponent(
          doc.title
        )}`,
      author: {
        "@type": "Person",
        name: "Federico Vitale",
      },
    }),
  },
};

const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: "**/*.mdx",
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    tags: {
      type: "string",
      required: true,
    },
    summary: {
      type: "string",
      required: true,
    },
    date: {
      type: "date",
      required: true,
    },
    origin: {
      type: "string",
    },
    image: {
      type: "string",
    },
  },
  computedFields,
}));

export default makeSource({
  contentDirPath: "src/posts",
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: "vitesse-dark",
          onVisitLine: (node: any) => {
            if (node.children.length === 0) {
              node.children = [
                {
                  type: "text",
                  value: " ",
                },
              ];
            }
          },
          onVisitHighlightedLine: (node: any) => {
            node.properties.className.push("line--highlighted");
          },
          onVisitHighlightedWord: (node, id?: string) => {
            node.properties.className = ["word"];

            if (id) {
              const className = {
                v: "rx-bg-red-3 rx-text-red-12",
                s: "rx-bg-green-3 rx-text-green-12",
                i: "rx-bg-blue-4 rx-text-blue-12",
              }[id];

              if (node.properties["data-rehype-pretty-code-wrapper"]) {
                node.children.forEach((n: any) => {
                  n.properties.className.push(className);
                });
              }
            }

            // node.properties.className.push("word--highlighted");
          },
        } as Options,
      ],
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ["anchor"],
          },
        },
      ],
    ],
  },
});

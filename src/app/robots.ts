import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    sitemap: "https://untitled.dev/sitemap.xml",
    rules: [
      {
        allow: "/",
        userAgent: "*",
        disallow: "/typography",
      },
    ],
  };
}

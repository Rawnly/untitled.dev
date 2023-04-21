import { ImageResponse } from "@vercel/og";
import { findPost } from "@/app/[...slug]/utils";
import { allPosts } from "contentlayer/generated";
import { NextRequest } from "next/server";

export function GET(
  _request: NextRequest,
  {
    params: { slug },
  }: {
    params: Record<string, string | string[]>;
  }
) {
  const post = allPosts.find(findPost(slug));

  return new ImageResponse(
    (
      <div
        style={{
          background: "#1d1d1d",
          color: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <b style={{ fontSize: 42, fontWeight: 600 }}>
          {post?.title ?? "hello"}
        </b>
        <div style={{ fontSize: 24 }}>{post?.summary}</div>

        <div
          style={{
            left: 25,
            bottom: 25,
            position: "absolute",
            display: "flex",
            gap: 16,
          }}
        >
          <div
            style={{
              width: 100,
              height: 100,
              borderRadius: "100%",
              background: "currentColor",
              backgroundImage: "url(https://unavatar.io/github/rawnly)",
              backgroundSize: "100% 100%",
              border: "2px solid currentColor",
            }}
          />
          <ul
            style={{
              display: "flex",
              flexDirection: "column",
              margin: "auto 0",
            }}
          >
            <li>twitter.com/fedevitaledev</li>
            <li>github.com/rawnly</li>
          </ul>
        </div>
      </div>
    ),
    {
      debug: true,
    }
  );
}

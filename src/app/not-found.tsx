"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-screen w-screen flex items-center justify-center flex-col">
      <div>
        <h1>Page not found</h1>
        <p>Sorry, I couldn&apos;t find the page you were looking for.</p>
        <p className="text-sm mt-2">
          <Link
            className="group flex inline-flex items-center justify-start relative pl-5"
            href="/"
          >
            <ArrowLeft className="w-4 transition-all -translate-y-1/2 -left-0 group-hover:-translate-x-2 absolute top-1/2" />
            <span>Back home</span>
          </Link>
        </p>
      </div>
    </div>
  );
}

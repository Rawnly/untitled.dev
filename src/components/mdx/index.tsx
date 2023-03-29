export { default as pre } from "./CodeBlock";
export { default as p } from "./Paragraph";
export { default as code } from "./Code";

import clsx from "clsx";
import Link from "next/link";
import { tv } from "tailwind-variants";

const linkVariants = tv({
  base: "rx-text-blue-11 hover:underline",
});

export const a = ({
  className,
  href,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"a">) => (
  <Link className={linkVariants({ className })} href={href ?? "#"} {...props}>
    {children}
  </Link>
);

const ulVariants = tv({
  base: "pl-4 list-disc space-y-1",
});

export const ul = ({
  children,
  className,
  ...props
}: React.ComponentProps<"ul">) => (
  <ul className={ulVariants({ className })} {...props}>
    {children}
  </ul>
);

const olVariants = tv({
  base: ["pl-4 my-4 space-y-2", "list-decimal"],
});

export const ol = ({
  children,
  className,
  ...props
}: React.ComponentProps<"ol">) => (
  <ul className={olVariants({ className })} {...props}>
    {children}
  </ul>
);

export const blockquote = ({
  children,
  ...props
}: React.ComponentProps<"blockquote">) => (
  <blockquote
    {...props}
    className={clsx(
      "rx-text-neutral-11 my-4",
      "rx-bg-neutral-2 p-4 rounded-lg border-l-4 rx-border-neutral-6 rounded-none italic relative",
      props.className
    )}
  >
    {children}
  </blockquote>
);

import { tv } from "tailwind-variants";
import CopyContent from "./CopyContent";

const variants = tv({
  base: [
    "text-sm rx-text-neutral-12",
    "border rx-border-neutral-6 rounded rx-bg-neutral-3 p-4 my-4 overflow-x-scroll",
    "relative group",
  ],
});

export function CodeBlock({
  className,
  children,
  ref: _ref,
  ...props
}: React.ComponentProps<"pre">) {
  return (
    <CopyContent>
      <pre className={variants({ className })} {...props}>
        {children}
      </pre>
    </CopyContent>
  );
}

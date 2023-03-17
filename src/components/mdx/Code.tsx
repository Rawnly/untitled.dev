import { tv } from "tailwind-variants";

const variants = tv({
  base: "rx-text-red-11 px-2 py-1 rounded rx-bg-neutral-3 text-sm tabular-nums",
});

export default function Code({
  children,
  className,
  ...props
}: React.ComponentProps<"code">) {
  return (
    <code className={variants({ className })} {...props}>
      {children}
    </code>
  );
}

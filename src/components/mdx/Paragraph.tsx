import clsx from "clsx";

const Paragraph = ({ className, ...props }: any) => (
  <p {...props} className={clsx(className, "mb-2 focusable-row")} />
);

export default Paragraph;

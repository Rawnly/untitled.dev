import clsx from "clsx";

const Paragraph = ({ className, ...props }: any) => (
  <p {...props} className={clsx(className, "focusable-row")} />
);

export default Paragraph;

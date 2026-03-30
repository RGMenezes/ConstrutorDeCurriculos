import styles from "./Text.module.css";
import ReactMarkdown from "react-markdown";
import { forwardRef } from "react";

interface TextProps {
    variant?: "h1" | "h2" | "h3" | "h4" | "p1" | "p2" | "p3" | "md";
    children?: React.ReactNode;
    className?: string;
    key?: string | number;
    name?: string;
    id?: string;

}

const Text = forwardRef<HTMLElement, TextProps>(
  ({ children, className = "", variant = "p1", ...props }, ref) => {
    switch (variant) {
    case "h1":
      return <h1 ref={ref as React.Ref<HTMLHeadingElement>} className={`${styles.h1} ${className}`} {...props}>{children}</h1>;
    case "h2":
      return <h2 ref={ref as React.Ref<HTMLHeadingElement>} className={`${styles.h2} ${className}`} {...props}>{children}</h2>;
    case "h3":
      return <h3 ref={ref as React.Ref<HTMLHeadingElement>} className={`${styles.h3} ${className}`} {...props}>{children}</h3>;
    case "h4":
      return <h4 ref={ref as React.Ref<HTMLHeadingElement>} className={`${styles.h4} ${className}`} {...props}>{children}</h4>;
    case "md":
      return <div ref={ref as React.Ref<HTMLDivElement>} className={`${styles.md} ${className}`}>
        <ReactMarkdown {...props}>{children as string}</ReactMarkdown>
      </div>;
    default:
      return <p ref={ref as React.Ref<HTMLParagraphElement>} className={`${styles[variant]} ${className}`} {...props}>{children}</p>;
    }
  }
);

Text.displayName = "Text";

export default Text;


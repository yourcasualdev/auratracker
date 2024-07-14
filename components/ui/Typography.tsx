import { cn } from "@/lib/utils";
import React from "react";

type Size =
  | "display-2xl"
  | "display-xl"
  | "display-lg"
  | "display-md"
  | "display-sm"
  | "display-xs"
  | "text-xl"
  | "text-lg"
  | "text-md"
  | "text-sm"
  | "text-xs";

type Variant = "Regular" | "Medium" | "SemiBold" | "Bold";

const tags = {
  "display-2xl": "h1",
  "display-xl": "h1",
  "display-lg": "h1",
  "display-md": "h1",
  "display-sm": "h1",
  "display-xs": "h1",
  "text-xl": "h2",
  "text-lg": "h3",
  "text-md": "h4",
  "text-sm": "h5",
  "text-xs": "h6",
};

const variants = {
  Regular: "font-normal",
  Medium: "font-medium",
  SemiBold: "font-semibold",
  Bold: "font-bold",
};

const sizes = {
  "display-2xl": "text-7xl",
  "display-xl": "text-6xl",
  "display-lg": "text-5xl",
  "display-md": "text-4xl",
  "display-sm": "text-3xl",
  "display-xs": "text-2xl",
  "text-xl": "text-xl",
  "text-lg": "text-lg",
  "text-md": "text-md",
  "text-sm": "text-sm",
  "text-xs": "text-xs",
};

const colors = {
  primary: "text-text-primary",
  secondary: "text-text-secondary",
  tertiary: "text-text-tertiary",
  quarterary: "text-text-quarterary",
  white: "text-white",
  destructive: "text-[#D92D20]",
  destructiveSecondary: "text-destructive-secondary",
};

export interface TypographyProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  size?: Size;
  variant?: Variant;
  color?: keyof typeof colors;
  text?: string;
}

const Typography = React.forwardRef<HTMLHeadingElement, TypographyProps>(
  (
    {
      size = "display-md",
      text = "",
      variant = "Regular",
      color = "primary",
      children,
      className,
      ...props
    },
    ref
  ) => {
    const Template = React.createElement(
      tags[size],
      {
        className: cn(
          "font-sans",
          sizes[size],
          variants[variant],
          colors[color],
          className
        ),
        ref,
        ...props,
      },
      children || text
    );

    return Template;
  }
);

Typography.displayName = "Typography";

export default Typography;

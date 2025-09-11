'use client'

import { twMerge } from "tailwind-merge";

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  titleColor?: string;
  subtitleColor?: string;
  size?: "default" | "sm" | "lg" | "xl";
};

const sizes = {
  default: { title: "text-lg", subtitle: "text-sm" },
  sm: { title: "text-base", subtitle: "text-sm" },
  lg: { title: "text-xl", subtitle: "text-sm" },
  xl: { title: "text-2xl", subtitle: "text-sm" },
};

export default function PageHeader({
  title,
  subtitle,
  titleColor = "#1D2939",
  subtitleColor = "#475467",
  size = "default",
}: Readonly<PageHeaderProps>) {
  return (
    <div>
      <h1
        className={twMerge(
          "font-semibold",
          sizes[size].title,
          `text-[${titleColor}]`
        )}
      >
        {title}
      </h1>
      {subtitle && (
        <p className={twMerge(sizes[size].subtitle, `text-[${subtitleColor}]`)}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

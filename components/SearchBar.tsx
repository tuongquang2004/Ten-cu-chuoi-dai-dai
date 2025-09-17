"use client";

import CommonButton from "./CommonButton";
import { inter } from "@/constants/fonts";
import { Search } from "@/public/assets/icons";
import { cn } from "@/app/cn";

type SearchBarProp = {
  readonly placeholder?: string;
  readonly variant?: "default" | "secondary" | "third";
  readonly iconAlign?: "left" | "right";
  readonly buttonAlign?: "left" | "right";
  readonly size?: "default" | "sm" | "lg" | "xl";
  readonly onChange: (value: string) => void;
  readonly buttonFunction?: () => void;
  readonly className?: string;
};

const variants = {
  default: "placeholder:text-[#475467] placeholder:text-[12px] py-[10px]",
  secondary: `placeholder:text-[#475467] text-[12px] bg-[#F2F4F7] focus:outline-none ${inter.className}`,
  third: `placeholder:text-[#1D2939] text-[14px] bg-[#FFFFFF] border border-[#98A2B3] min-w-[500px] w-[450px] rounded-md focus:outline-none ${inter.className}`,
};

const sizes = {
  default: "h-7",
  sm: "h-5",
  lg: "h-9",
  xl: "h-11",
};

export default function SearchBar({
  placeholder,
  variant = "default",
  iconAlign,
  buttonAlign,
  size = "default",
  className,
  onChange,
  buttonFunction,
}: SearchBarProp) {
  const base = `rounded ${iconAlign && iconAlign === "left" ? "pl-8 pr-2" : "pl-2 pr-8"}`;
  return (
    <div className="flex justify-center gap-2">
      {buttonAlign && buttonAlign === "left" && (
        <CommonButton
          onClick={buttonFunction}
          variant="square"
          className="text-white cursor-pointer"
        >
          <Search />
        </CommonButton>
      )}
      <div className="relative flex-1">
        <input
          onKeyDown={(e) => {
            if (e.key === "Enter" && buttonFunction) {
              e.preventDefault();
              buttonFunction();
            }
          }}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn(
            base,
            variants[variant],
            sizes[size],
            className,
            iconAlign === "left" ? "pl-9 pr-3" : "pl-3 pr-9",
          )}
        />
        {iconAlign && (
          <div
            className={`absolute top-1/2 -translate-y-1/2 ${iconAlign === "left" ? "left-2" : "right-2"}`}
          >
            <Search />
          </div>
        )}
      </div>
      {buttonAlign && buttonAlign === "right" && (
        <CommonButton
          onClick={buttonFunction}
          variant="square"
          className="text-white cursor-pointer"
        >
          <Search />
        </CommonButton>
      )}
    </div>
  );
}

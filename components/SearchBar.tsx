"use client";

import CommonButton from "./CommonButton";
import { Inter } from "@/constants/fonts";
import { Search } from "@/public/assets/icons";
import { cn } from "@/app/cn";
import Dropdown from "./Dropdown";

type SearchBarProps<T> = {
  placeholder?: string;
  variant?: "default" | "secondary" | "third";
  iconAlign?: "left" | "right";
  buttonAlign?: "left" | "right";
  searchBy?: {
    items: Array<{ label: string; key: string; value: keyof T }>;
    selectedKey?: string;
    onChange: (value: keyof T) => void;
  };
  size?: "default" | "sm" | "lg" | "xl";
  onChange: (value: string) => void;
  buttonFunction?: () => void;
  className?: string;
};

const variants = {
  default: "placeholder:text-[#475467] placeholder:text-[12px] py-[10px]",
  secondary:
    "placeholder:text-[#475467] text-[12px] bg-[#F2F4F7] focus:outline-none border-none",
  third:
    "placeholder:text-[#1D2939] text-[14px] bg-[#FFFFFF] border border-[#98A2B3] min-w-[500px] w-[450px] rounded-md focus:outline-none",
};

const sizes = {
  default: "h-7",
  sm: "h-5",
  lg: "h-9",
  xl: "h-11",
};

export default function SearchBar<T>({
  placeholder,
  variant = "default",
  iconAlign,
  buttonAlign,
  searchBy,
  size = "default",
  className,
  onChange,
  buttonFunction,
}: Readonly<SearchBarProps<T>>) {
  const inputBase = "flex-1 bg-transparent outline-none";

  return (
    <div className="flex items-center gap-2 w-full">
      {buttonAlign === "left" && (
        <CommonButton
          onClick={buttonFunction}
          variant="square"
          className="text-white cursor-pointer"
        >
          <Search />
        </CommonButton>
      )}

      <div
        className={cn(
          "flex items-center gap-2 border rounded px-2 w-full",
          variants[variant],
          sizes[size],
          className
        )}
      >
        {iconAlign === "left" && <Search />}
        <input
          onKeyDown={(e) => {
            if (e.key === "Enter" && buttonFunction) {
              e.preventDefault();
              buttonFunction();
            }
          }}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={inputBase}
        />
        {iconAlign === "right" && <Search />}
        {searchBy && (
          <Dropdown
            position="top-5"
            items={searchBy.items}
            selectedKey={searchBy.selectedKey}
            onChange={searchBy.onChange}
          />
        )}
      </div>

      {buttonAlign === "right" && (
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

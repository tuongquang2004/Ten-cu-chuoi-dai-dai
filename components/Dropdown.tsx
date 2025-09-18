import { cn } from "@/app/cn";
import { Inter } from "@/constants/fonts";
import { DownArrow } from "@/public/assets/icons";
import { useState } from "react";

type DropdownProps<T> = {
  label?: string;
  items: Array<{ label: string; value: keyof T; key: string }>;
  className?: string;
  position?: string;
  selectedKey?: string;
  onChange: (value: keyof T) => void;
};

export default function Dropdown<T>({
  label,
  items,
  className,
  position,
  selectedKey,
  onChange,
}: Readonly<DropdownProps<T>>) {
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>("");

  const handleClick = (key: string, value: keyof T) => {
    setSelected(key);
    onChange(value);
    setShowOptions(false);
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-fit">
      <button
        onClick={() => setShowOptions((prev) => !prev)}
        className="flex gap-2 items-center cursor-pointer p-1 w-fit"
      >
        {label}
        <DownArrow />
      </button>
      {showOptions && (
        <div
          className={cn(
            "absolute flex flex-col w-fit top-9 border border-[#D0D5DD] rounded-lg bg-white",
            position
          )}
        >
          {items.map((i) => (
            <button
              className={cn(
                `text-start w-full hover:bg-neutral-100 flex-1 p-2 cursor-pointer font-[500] ${Inter.className}`,
                selected.length !== 0
                  ? selected === i.key && "bg-neutral-200"
                  : selectedKey === i.key && "bg-neutral-200",
                className
              )}
              key={i.key}
              onClick={() => handleClick(i.key, i.value)}
            >
              {i.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

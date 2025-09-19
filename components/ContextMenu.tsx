import { cn } from "@/app/cn";

type ContextMenuProps = {
  items: Array<{
    key?: string;
    label: string;
    onClick: () => void;
  }>;
  position: { top: number; left: number };
  className?: string;
};

export default function ContextMenu({
  items,
  position,
  className,
}: Readonly<ContextMenuProps>) {
  return (
    <div
      className="absolute flex flex-col border border-[#D0D5DD] rounded-lg bg-white"
      style={{ top: position.top, left: position.left }}
    >
      {items.map((i) => (
        <button
          key={i.key}
          onClick={i.onClick}
          className={cn(
            "p-2 min-w-[100px] font-[500] flex justify-start items-center min-w-[100px] cursor-pointer hover:bg-neutral-100",
            className
          )}
        >
          {i.label}
        </button>
      ))}
    </div>
  );
}

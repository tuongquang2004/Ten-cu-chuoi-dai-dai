import { cn } from "@/app/cn"
import { inter } from "@/constants/fonts"

type ContextMenuProps = {
    items: Array<{ key?: string, label: string, onClick: () => void }>,
    className?: string,
    selected?: string
}


export default function ContextMenu({ items, className, selected }: Readonly<ContextMenuProps>) {
    return (
        <div className="flex flex-col border border-[#D0D5DD] rounded-lg bg-white">
            {items.map(i => (
                <button key={i.key} onClick={i.onClick} className={cn(`p-2 font-[500] flex justify-start items-center min-w-[100px] cursor-pointer hover:bg-neutral-100 ${inter.className}`, className)}>
                    {i.label}
                </button>
            ))}
        </div>
    )
}
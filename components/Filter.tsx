"use client"

import { useState } from "react"
import { inter } from "@/constants/fonts";
import { cn } from "@/app/cn";
import { DownArrow, Reset } from "@/public/assets/icons";

type FilterProps = {
    label: string,
    items: Array<{ key: string, label: string, value: string }>,
    onChange: (value: string[]) => void,
    showCount?: boolean,
    showReset?: boolean,
    className?: string
}

export default function Filter({ label, items, showCount = false, showReset = false, onChange, className }: Readonly<FilterProps>) {
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
    const [isShow, setIsShow] = useState<boolean>(false);
    const filterActive = selectedKeys.length !== 0;

    const handleSelect = (key: string) => {
        let newKeys: string[];

        if (selectedKeys.includes(key)) {
            newKeys = selectedKeys.filter(s => s !== key);
        } else {
            newKeys = [...selectedKeys, key];
        }
        setSelectedKeys(newKeys);
        const selectedValues = items
            .filter(i => newKeys.includes(i.key))
            .map(i => i.value);

        onChange(selectedValues);
    };

    const handleReset = () => {
        setSelectedKeys([]);
        onChange([]);
        setIsShow(false);
    }

    return (
        <div className={`relative ${inter.className}`}>
            <div className="flex items-center justify-center gap-1 w-fit">
                <button className={cn(`flex items-center gap-1 cursor-pointer`, filterActive && 'font-[700]')} onClick={() => setIsShow(prev => !prev)}>
                    {showCount && filterActive && (
                        <p>{`(${selectedKeys.length})`}</p>
                    )}
                    {label}
                    <DownArrow />
                </button>
                {showReset && filterActive && (
                    <button className="cursor-pointer" onClick={() => handleReset()}>
                        <Reset />
                    </button>
                )}
            </div>
            {isShow && (
                <div className="border bg-white absolute top-7 border-[#D0D5DD] rounded-lg p-[4px] w-fit min-w-[112px] shadow-[2px_10px_25px_rgba(0,0,0,0.1)]">
                    {items.map(i => (
                        <div key={i.key} className={cn('flex items-center gap-[6px] px-[6px] hover:bg-neutral-200', className)}>
                            <input className="cursor-pointer" checked={selectedKeys.includes(i.key)} type="checkbox" id={i.key} value={i.value} onChange={() => handleSelect(i.key)} />
                            <label className="select-none cursor-pointer w-full" htmlFor={i.key}>{i.label}</label>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
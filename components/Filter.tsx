"use client"

import { useEffect, useState } from "react"
import { Icon } from "./Icon";
import { inter } from "@/lib/data";

type FilterProps = {
    label: string,
    items: Array<{ key: string, label: string, value: string }>,
    list: object[],
    setList: () => void,
    showCount?: boolean,
    showReset?: boolean,
    className?: string
}

export default function Filter({ label, items, showCount = false, showReset = false, className }: Readonly<FilterProps>) {
    const [selected, setSelected] = useState<string[]>([]);
    const [isShow, setIsShow] = useState<boolean>(false);

    const handleSelect = (key: string) => {
        if (selected.includes(key)) {
            setSelected(prev => prev.filter(s => s !== key))
        }
        else {
            setSelected(prev => ([...prev, key]))
        }
        console.log(selected);

    }

    const handleReset = () => {
        setSelected([]);
    }

    return (
        <div className={`relative ${inter.className}`}>
            <div className="flex items-center justify-center gap-1 w-fit">
                {/* <button className="flex items-center gap-1" onClick={() => setIsShow(prev => !prev)}>
                    <p className={`${isShow && 'invisible'} `}>{`(${selected.length})`}</p>
                    {label}
                    <Icon.DownArrow />
                </button>
                <button className={`${isShow && 'invisible'}`}>
                    <Icon.Reset />
                </button> */}

                <button className="flex items-center gap-1 font-[700] cursor-pointer" onClick={() => setIsShow(prev => !prev)}>
                    {showCount && (
                        <p>{`(${selected.length})`}</p>
                    )}
                    {label}
                    <Icon.DownArrow />
                </button>
                {showReset && (
                    <button className="cursor-pointer" onClick={() => handleReset()}>
                        <Icon.Reset />
                    </button>
                )}
            </div>
            {isShow && (
                <div className="border absolute top-7 border-[#D0D5DD] rounded-lg p-[4px] w-fit min-w-[112px] shadow-[2px_10px_25px_rgba(0,0,0,0.1)]">
                    {items.map(i => (
                        <div key={i.key} className="flex items-center gap-[6px] px-[6px] hover:bg-neutral-200">
                            <input className="cursor-pointer" checked={selected.includes(i.key)} type="checkbox" id={i.key} value={i.value} onChange={() => handleSelect(i.key)} />
                            <label className="select-none cursor-pointer w-full" htmlFor={i.key}>{i.label}</label>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
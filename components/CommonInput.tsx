"use client"

import { useState } from "react"
import { Icon } from "./Icon";

type InputProps = {
    label: string,
    value: string,
    placeholder?: string,
    type?: 'text' | 'password' | 'email',
    eye?: boolean,
    error?: string,
    onChange: (value: string) => void,
}

export default function CommonInput({ label, placeholder, value = '', type = 'text', eye = true, error = '', onChange }: Readonly<InputProps>) {
    const [inputType, setInputType] = useState<string>(type);

    return (
        <div className="w-full relative text-[#344054]">
            <div className="font-semibold">{label}</div>
            <input className={`placeholder:text-[#98A2B3] border-b focus:outline-none w-full ${error?.length > 0 && 'border-[#F04438]'}`} value={value} placeholder={placeholder} type={inputType} onChange={(e) => onChange(e.target.value)}></input>
            <div className="text-[#F04438] text-[14px]">{error}</div>
            {type === 'password' && eye && (
                <div className="absolute top-1/2 -transform-y-1/2 right-2">
                    {inputType === 'password' ? (
                        <button onClick={() => setInputType('text')}>
                            <Icon.OpenEye />
                        </button>
                    ) : (
                        <button onClick={() => setInputType('password')}>
                            <Icon.ClosedEyes />
                        </button>
                    )}
                </div>
            )}
        </div>
    )
}
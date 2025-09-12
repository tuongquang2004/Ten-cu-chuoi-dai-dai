"use client"

import { useState } from "react"
import { OpenEye, ClosedEye } from '@/public/assets/icons';
import { twMerge } from "tailwind-merge";

type InputProps = {
    label: string,
    value: string,
    placeholder?: string,
    type?: 'text' | 'password' | 'email',
    eye?: boolean,
    error?: string,
    className?: string,
    onChange: (value: string) => void,
}

export default function CommonInput({ label, placeholder, value = '', type = 'text', eye = true, error = '', className, onChange }: Readonly<InputProps>) {
    const [inputType, setInputType] = useState<string>(type);

    return (
        <div className="w-full text-[#344054]">
            <div className="font-semibold">{label}</div>
            <div className="relative">
                <input className={twMerge('placeholder:text-[#98A2B3] border-b focus:outline-none w-full', error?.length > 0 && 'border-[#F04438]', type === 'password' && eye && 'pr-8', className)} value={value} placeholder={placeholder} type={inputType} onChange={(e) => onChange(e.target.value)}></input>
                {type === 'password' && eye && (
                    <div className="absolute top-1 right-2">
                        {inputType === 'password' ? (
                            <button onClick={() => setInputType('text')}>
                                <OpenEye />
                            </button>
                        ) : (
                            <button onClick={() => setInputType('password')}>
                                <ClosedEye />
                            </button>
                        )}
                    </div>
                )}
            </div>
            {error && (<div className="text-[#F04438] text-[14px]">{error}</div>)}
        </div>
    )
}
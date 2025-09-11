'use client'

import { twMerge } from "tailwind-merge"
import { Inter } from "next/font/google";
import CommonButton from "./CommonButton";
import Search from '@/public/assets/icons/search.svg';

const inter = Inter({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
});


type SearchBarProp = {
    readonly placeholder?: string,
    readonly variant?: 'default' | 'secondary' | 'third',
    readonly icon_align?: 'left' | 'right',
    readonly button_align?: 'left' | 'right',
    readonly size?: 'default' | 'sm' | 'lg' | 'xl'
    readonly className?: string
}

const variants = {
    default: '',
    secondary: `placeholder:text-[#475467] text-[12px] bg-[#F2F4F7] focus:outline-none ${inter.className}`,
    third: `placeholder:text-[#1D2939] text-[14px] bg-[#FFFFFF] border border-[#98A2B3] min-w-[500px] w-[450px] rounded-md focus:outline-none ${inter.className}`

}

const sizes = {
    default: 'h-7',
    sm: 'h-5',
    lg: 'h-9',
    xl: 'h-11'
}

export default function SearchBar({ placeholder, variant = 'default', icon_align, button_align, size = 'default', className }: SearchBarProp) {
    const base = `rounded ${(icon_align && icon_align === 'left') ? 'px-7' : 'px-1'}`
    return (
        <div className="flex justify-center gap-2">
            {button_align && button_align === 'left' && (
                <CommonButton variant="square" className="text-white"><Search /></CommonButton>
            )}
            <div className="relative flex-1">
                <input placeholder={placeholder} className={twMerge(base, variants[variant], sizes[size], className, icon_align === 'left' ? 'pl-9 pr-3' : 'pl-3 pr-9')} />
                {icon_align && (
                    <div className={`absolute top-1/2 -translate-y-1/2 ${icon_align === 'left' ? 'left-1' : 'right-1'}`}><Search /></div>
                )}
            </div>
            {button_align && button_align === 'right' && (
                <CommonButton variant="square" className="text-white"><Search /></CommonButton>
            )}
        </div>
    )
}
import { twMerge } from "tailwind-merge"
import CommonButton from "./CommonButton";
import { inter } from "@/lib/data";
import Search from '@/public/assets/icons/search.svg';

type SearchBarProp = {
    readonly placeholder?: string,
    readonly variant?: 'default' | 'secondary',
    readonly icon_align?: 'left' | 'right',
    readonly button_align?: 'left' | 'right',
    readonly size?: 'default' | 'sm' | 'lg' | 'xl'
    readonly className?: string
}

const variants = {
    default: 'placeholder:text-[#475467] placeholder:text-[12px] py-[10px]',
    secondary: `placeholder:text-[#475467] text-[12px] bg-[#F2F4F7] focus:outline-none ${inter.className}`
}

const sizes = {
    default: 'h-7',
    sm: 'h-5',
    lg: 'h-9',
    xl: 'h-11'
}

export default function SearchBar({ placeholder, variant = 'default', icon_align, button_align, size = 'default', className }: SearchBarProp) {
    const base = `rounded ${(icon_align && icon_align === 'left') ? 'pl-8 pr-2' : 'pl-2 pr-8'}`
    return (
        <div className="flex justify-center gap-2">
            {button_align && button_align === 'left' && (
                <CommonButton variant="square" className="text-white"><Search /></CommonButton>
            )}
            <div className="relative">
                <input placeholder={placeholder} className={twMerge(base, variants[variant], sizes[size], className)} />
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
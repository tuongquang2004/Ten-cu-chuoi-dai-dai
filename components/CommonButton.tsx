import {twMerge} from "tailwind-merge";

const base = 'cursor-pointer inline-flex items-center justify-center rounded-md font-medium transition px-[18px] py-[6px]';

const variants = {
    default: '',
    primary: 'bg-[#252C88] text-white',
    danger: '',
    warning: '',
    circle: 'rounded-full bg-[#2F3680] p-1',
    square: 'rounded bg-[#2F3680] p-1',
    outline: 'border border-[#D0D5DD] text-[#1D2939] rounded-full',
    yellow: 'border border-[#D0D5DD] text-[#FFFFFF] rounded-full bg-[#E87200] '
}

const sizes = {
    default: '',
    sm: '',
    lg: '',
    xl: 'h-11 w-11',
    button: 'h-11'
}

type CommonButtonProps = {
    readonly children?: React.ReactNode;
    readonly variant?: 'default' | 'primary' | 'danger' | 'warning' | 'outline' | 'circle' | 'square'| 'yellow',
    readonly size?: 'default' | 'sm' | 'lg' | 'xl' | 'button',
    readonly onClick?: () => void,
    readonly className?: string
}

export default function CommonButton({ children, variant = 'default', size = 'default', onClick, className }: CommonButtonProps) {
    return (
        <button className={twMerge(base, variants[variant], sizes[size], className)}
            onClick={onClick}>
            {children}
        </button>
    )
}
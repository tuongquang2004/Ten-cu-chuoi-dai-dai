import {twMerge} from "tailwind-merge";

const base = 'inline-flex items-center justify-center rounded-md font-medium transition px-[18px] py-[6px]';

const variants = {
    default: '',
    primary: '',
    danger: '',
    warning: '',
    circle: 'rounded-full bg-[#2F3680] p-1',
    square: '',
    outline: 'border border-[#D0D5DD] rounded-full'
}

const sizes = {
    default: '',
    sm: '',
    lg: '',
    xl: ''
}

type CommonButtonProps = {
    readonly children?: React.ReactNode;
    readonly variant?: 'default' | 'primary' | 'danger' | 'warning' | 'outline' | 'circle' | 'square',
    readonly size?: 'default' | 'sm' | 'lg' | 'xl'
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
import { cn } from "@/app/cn";

<<<<<<< HEAD
=======
const base =
  "cursor-pointer inline-flex items-center justify-center rounded-md font-medium transition px-[18px] py-[6px]";
>>>>>>> feature/import-modal

const variants = {
  default: "",
  primary: "bg-[#252C88] border border-[#D0D5DD] text-[#FFFFFF] rounded-full",
  danger: "",
  warning: "",
  circle: "rounded-full bg-[#2F3680] p-1 aspect-square",
  square: "rounded bg-[#2F3680] p-1 aspect-square",
  outline: "border border-[#D0D5DD] text-[#1D2939] rounded-full",
  yellow: "border border-[#D0D5DD] text-[#FFFFFF] rounded-full bg-[#E87200] ",
};

const sizes = {
  default: "min-h-[40px]",
  sm: "h-[30px]",
  lg: "",
  xl: "h-11 w-11",
  button: "h-11",
};

type CommonButtonProps = {
  readonly children?: React.ReactNode;
  readonly variant?:
    | "default"
    | "primary"
    | "danger"
    | "warning"
    | "outline"
    | "circle"
    | "square"
    | "yellow";
  readonly size?: "default" | "sm" | "lg" | "xl" | "button";
  readonly onClick?: () => void;
  readonly className?: string;
  readonly disabled?: boolean;
};

<<<<<<< HEAD
export default function CommonButton({ children, variant = 'default', size = 'default', onClick, disabled, className }: CommonButtonProps) {
    const base = `inline-flex items-center justify-center rounded-md font-medium transition px-[18px] py-[6px] ${!disabled && 'cursor-pointer'}`;

    return (
        <button disabled={disabled} className={cn(base, variants[variant], sizes[size], className)}
            onClick={onClick} >
            {children}
        </button >
    )
}
=======
export default function CommonButton({
  children,
  variant = "default",
  size = "default",
  onClick,
  disabled,
  className,
}: CommonButtonProps) {
  return (
    <button
      disabled={disabled}
      className={cn(base, variants[variant], sizes[size], className)}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
>>>>>>> feature/import-modal

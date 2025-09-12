import { twMerge } from "tailwind-merge";

type CommonCheckboxProps = {
    key: string,
    label: string;
    checked?: boolean;
    onChange: (checked: boolean) => void;
    className?: string;
};

export default function CommonCheckbox({ label, checked, className, onChange }: Readonly<CommonCheckboxProps>) {
    return (
        <div className="flex items-center gap-[6px] px-[6px]">
            <input id={label} className="cursor-pointer" type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
            <label className={twMerge("select-none cursor-pointer w-full", className)} htmlFor={label}>
                {label}
            </label>
        </div>
    );
}

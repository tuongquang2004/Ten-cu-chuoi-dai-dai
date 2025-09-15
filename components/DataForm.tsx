import { Madani } from "@/lib/data"
import CommonButton from "./CommonButton"
import CommonCheckbox from "./CommonCheckbox"

type DataFormProps = {
    label: string,
    children: React.ReactNode,
    buttonLabel?: string,
    statusCheckbox?: {
        className?: string,
        current: boolean,
        onChange: (checked: boolean) => void;
    },
    checked?: boolean,
    buttonDisabled?: boolean,
    onCancel: () => void
    onSubmit: () => void
}

export default function DataForm({ label, children, buttonLabel = 'Submit', statusCheckbox, onCancel, onSubmit, checked, buttonDisabled = false }: Readonly<DataFormProps>) {
    return (
        <div className="rounded-lg bg-white p-[12px] flex flex-col gap-2">
            <div className={`text-[#2F3680] ${Madani.className}`}>
                {label}
            </div>
            {children}
            <div className="flex items-center justify-between">
                {statusCheckbox && (
                    <CommonCheckbox checked={checked} className={statusCheckbox.className} label={statusCheckbox.current ? 'Make Inactive' : 'Make Active'} onChange={statusCheckbox.onChange} />
                )}
                <div className="flex justify-end gap-4 flex-1">
                    <CommonButton onClick={onCancel} variant="outline" className="w-fit">Cancel</CommonButton>
                    <CommonButton disabled={buttonDisabled} onClick={onSubmit} variant="primary" className="w-fit rounded-full">{buttonLabel}</CommonButton>
                </div>
            </div>
        </div>
    )
}
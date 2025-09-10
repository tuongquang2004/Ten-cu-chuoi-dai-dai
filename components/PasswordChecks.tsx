import { check } from "@/lib/data";
import { Icon } from "./Icon";
import { twMerge } from "tailwind-merge";

type PasswordChecksProps = {
    checks: Array<check>,
    className?: string
}

export default function PasswordChecks({ checks, className }: Readonly<PasswordChecksProps>) {
    return (
        <div>
            {checks.map(c => (
                <div className={twMerge('flex items-center gap-1', className)} key={c.key}>
                    {c.status ? (<Icon.Check />) : (<Icon.Cross />)}
                    {c.label}
                </div>
            ))}
        </div>
    )
}
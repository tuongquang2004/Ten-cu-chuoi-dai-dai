import { check } from "@/lib/data";
import { Icon } from "./Icon";
import { twMerge } from "tailwind-merge";
import Check from '@/public/assets/icons/check.svg';
import Cross from '@/public/assets/icons/cross.svg';

type PasswordChecksProps = {
    checks: Array<check>,
    className?: string
}

export default function PasswordChecks({ checks, className }: Readonly<PasswordChecksProps>) {
    return (
        <div>
            {checks.map(c => (
                <div className={twMerge('flex items-center gap-1', className)} key={c.key}>
                    {c.status ? (<Check />) : (<Cross />)}
                    {c.label}
                </div>
            ))}
        </div>
    )
}
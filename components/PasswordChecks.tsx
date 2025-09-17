import { check } from "@/constants/types";
import { Check, Cross } from "@/public/assets/icons";
import { cn } from "@/app/cn";

type PasswordChecksProps = {
  checks: Array<check>;
  className?: string;
};

export default function PasswordChecks({
  checks,
  className,
}: Readonly<PasswordChecksProps>) {
  return (
    <div>
      {checks.map((c) => (
        <div className={cn("flex items-center gap-1", className)} key={c.key}>
          {c.status ? (
            <div className="text-[#0E864B]">
              <Check />
            </div>
          ) : (
            <div className="text-[#98A2B3]">
              <Cross />
            </div>
          )}
          {c.label}
        </div>
      ))}
    </div>
  );
}

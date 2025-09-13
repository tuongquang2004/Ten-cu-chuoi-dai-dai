"use client";

import { createColumns } from "@/components/CommonTable";
import { cn } from "@/app/cn";
import { RefSrc } from "@/lib/data";

export function useReferralSourceTable() {
    const header = createColumns<RefSrc>()([
        {
            key: "source",
            label: "Source",
        },
        {
            key: "isActive",
            label: "Status",
            headerClassName: "text-center",
            render: (row) => {
                const isActive = row.isActive;
                const bgColor = isActive ? "bg-[#D2FFD7]" : "bg-[#FFDFDD]";
                const textColor = isActive ? "text-[#00770C]" : "text-[#E42C1B]";
                const text = isActive ? "Active" : "Inactive";

                return (
                    <div className={cn("flex justify-center items-center w-full h-full")} >
                        <div
                            className={
                                cn(
                                    `shadow-[2px_3px_8px_rgba(0,0,0,0.15)] text-center font-medium rounded-full w-fit py-[3px] min-w-[77px] text-[15px] ${bgColor} ${textColor}`
                                )
                            }
                        >
                            {text}
                        </div>
                    </div>
                );
            },
        },
    ]);

    return { header };
}
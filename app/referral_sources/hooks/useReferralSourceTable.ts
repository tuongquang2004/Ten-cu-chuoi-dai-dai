"use client";

import { createColumns } from "@/components/CommonTable";
import { RefSrc } from "@/constants/types"; 
import StatusBadge from "@/constants/customRender";

export function useReferralSourceTable() {
    const header = createColumns<RefSrc>()([
        {
            key: "name",
            label: "Source",
        },
        {
            key: "isActive",
            label: "Status",
            headerClassName: "text-center",
            render: (row) => StatusBadge(row.isActive),
        },
    ]);

    return { header };
}

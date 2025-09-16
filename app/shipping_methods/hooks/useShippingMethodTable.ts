"use client";

import { createColumns } from "@/components/CommonTable";
import { ShippingMethod } from "@/constants/types"; 
import StatusBadge from "@/constants/customRender";

export function useShippingMethodTable() {
    const header = createColumns<ShippingMethod>()([
        {
            key: "name",
            label: "Shipping Methods",
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

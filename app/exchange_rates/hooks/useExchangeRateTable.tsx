"use client";

import { createColumns } from "@/components/CommonTable";
import { ExchangeRate } from "@/constants/types";
import StatusBadge from "@/constants/customRender";
import CommonButton from "@/components/CommonButton";
import { useExchangeRateDataActions } from "./useExchangeRateDataActions";

export function useExchangeRateTable() {
    const { getRate } = useExchangeRateDataActions()

    const header = createColumns<ExchangeRate>()([
        {
            key: "description",
            label: "Description"
        },
        {
            key: "code",
            label: "Code"
        },
        {
            key: "prefix",
            label: "Prefix"
        },
        {
            key: "rate",
            label: "Rate"
        },
        {
            key: "last_updated",
            label: "Last Updated"
        },
        {
            key: "isActive",
            label: "Status",
            headerClassName: "text-center",
            render: (row) => StatusBadge(row.isActive)
        },
        {
            key: "id",
            label: "Rate",
            headerClassName: "text-center",
            render: (row) => (
                <div className="flex justify-center">
                    <CommonButton variant="outline" onClick={() => getRate(row.id)} className="font-semibold bg-white">Get Rate</CommonButton>
                </div>
            )
        },
    ]);

    return { header };
}

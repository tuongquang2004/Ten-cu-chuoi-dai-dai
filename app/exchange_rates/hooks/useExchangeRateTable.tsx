"use client";

import { createColumns } from "@/components/CommonTable";
import { ExchangeRate } from "@/constants/types";
import StatusBadge from "@/constants/customRender";
import CommonButton from "@/components/CommonButton";

export function useExchangeRateTable() {
  const header = createColumns<ExchangeRate>()([
    {
      key: "description",
      label: "Description",
      sort: true,
    },
    {
      key: "code",
      label: "Code",
      sort: true,
    },
    {
      key: "prefix",
      label: "Prefix",
      sort: true,
    },
    {
      key: "rate",
      label: "Rate",
      sort: true,
    },
    {
      key: "last_updated",
      label: "Last Updated",
      sort: true,
      render: (row) => <div>{new Date(row.last_updated).toLocaleString()}</div>,
    },
    {
      key: "isActive",
      label: "Status",
      headerClassName: "justify-center",
      render: (row) => StatusBadge(row.isActive),
    },
    {
      key: "id",
      label: "Rate",
      headerClassName: "justify-center",
      render: () => (
        <div className="flex justify-center">
          <CommonButton
            variant="outline"
            size="sm"
            className="font-semibold bg-white"
          >
            Get Rate
          </CommonButton>
        </div>
      ),
    },
  ]);

  return { header };
}

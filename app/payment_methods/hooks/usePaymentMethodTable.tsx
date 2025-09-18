"use client";

import { createColumns } from "@/components/CommonTable";
import { PaymentMethod } from "@/constants/types";
import StatusBadge from "@/constants/customRender";

export function usePaymentMethodTable() {
  const header = createColumns<PaymentMethod>()([
    {
      key: "name",
      label: "Payment Methods",
    },
    {
      key: "type",
      label: "Account Type",
    },
    {
      key: "code",
      label: "Account Code",
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

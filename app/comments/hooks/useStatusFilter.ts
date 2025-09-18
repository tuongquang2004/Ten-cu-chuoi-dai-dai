'use client'
import { useMemo, useState } from 'react'

export enum StatusEnum {
  Active = "active",
  Inactive = "inactive",
}

export function useStatusFilter<T extends { isActive: boolean }>(rows: T[]) {
  const [selectedStatuses, setSelectedStatuses] = useState<StatusEnum[]>([])

  const handleStatusChange = (vals: string[]) => {
    setSelectedStatuses(vals as StatusEnum[])
  }

  const filteredRows = useMemo(() => {
    if (selectedStatuses.length === 0) return rows
    return rows.filter(r =>
      selectedStatuses.includes(r.isActive ? StatusEnum.Active : StatusEnum.Inactive)
    )
  }, [rows, selectedStatuses])

  const filterItems = [
    { key: StatusEnum.Active, label: "Active", value: StatusEnum.Active },
    { key: StatusEnum.Inactive, label: "Inactive", value: StatusEnum.Inactive }
  ]

  return { filterItems, selectedStatuses, handleStatusChange, filteredRows }
}

'use client'
import { useMemo, useState } from 'react'

export function useStatusFilter<T extends { isActive: boolean }>(rows: T[]) {
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([])

  const handleStatusChange = (vals: string[]) => {
    setSelectedStatuses(vals)
  }

  const filteredRows = useMemo(() => {
    if (selectedStatuses.length === 0) return rows
    return rows.filter(r =>
      selectedStatuses.includes(r.isActive ? "active" : "inactive")
    )
  }, [rows, selectedStatuses])

  const filterItems = [
    { key: "active", label: "Active", value: "active" },
    { key: "inactive", label: "Inactive", value: "inactive" }
  ]

  return { filterItems, selectedStatuses, handleStatusChange, filteredRows }
}

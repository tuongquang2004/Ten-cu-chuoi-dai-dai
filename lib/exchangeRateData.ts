import { ExchangeRate, TimeInterval } from "@/constants/types";

export const searchOptions = [
  { key: "code", label: "Code", value: "code" as keyof ExchangeRate },
  { key: "prefix", label: "Prefix", value: "prefix" as keyof ExchangeRate },
  {
    key: "description",
    label: "Description",
    value: "description" as keyof ExchangeRate,
  },
];

export const updateOptions = [
  { key: "never", label: "Never", value: "never" as keyof TimeInterval },
  { key: "daily", label: "Daily", value: "daily" as keyof TimeInterval },
  { key: "weekly", label: "Weekly", value: "weekly" as keyof TimeInterval },
  { key: "monthly", label: "Monthly", value: "monthly" as keyof TimeInterval },
];

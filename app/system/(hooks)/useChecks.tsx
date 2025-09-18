"use client";

import { useState } from "react";
import { check } from "@/constants/types";
import { REGEX } from "@/constants/regex";

const initialChecks: check[] = [
  {
    key: "length",
    label: "At least 8 characters",
    status: false,
  },
  {
    key: "upper",
    label: "One uppercase letter",
    status: false,
  },
  {
    key: "digit",
    label: "One number",
    status: false,
  },
  {
    key: "special",
    label: "One special character (e.g., !@#$%)",
    status: false,
  },
];

export function useChecks() {
  const [passwordChecks, setPasswordChecks] = useState<check[]>(initialChecks);

  const checkPassword = (password: string): boolean => {
    const newChecks = passwordChecks.map((check) => {
      switch (check.key) {
        case "length":
          return { ...check, status: password.length >= 8 };
        case "upper":
          return { ...check, status: REGEX.UPPER.test(password) };
        case "digit":
          return { ...check, status: REGEX.NUMBER.test(password) };
        case "special":
          return { ...check, status: REGEX.SPECIAL.test(password) };
        default:
          return check;
      }
    });

    setPasswordChecks(newChecks);

    return !newChecks.some((c) => !c.status);
  };

  return { passwordChecks, setPasswordChecks, checkPassword };
}

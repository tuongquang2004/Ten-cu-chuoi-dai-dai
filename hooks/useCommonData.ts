"use client";

import { useEffect, useState } from "react";
import axios from "axios";

type UseDataConfig<T> = {
  apiRoot: string;
};

export function useCommonData<T>({ apiRoot }: UseDataConfig<T>) {
  const [items, setItems] = useState<T[]>([]);
  const [backup, setBackup] = useState<T[]>([]);

  useEffect(() => {
    axios.get(apiRoot).then((res) => {
      if (res.data) {
        setItems(res.data);
        setBackup(res.data);
      }
    });
  }, [apiRoot]);

  return {
    items,
    backup,
    setItems,
    setBackup,
  };
}

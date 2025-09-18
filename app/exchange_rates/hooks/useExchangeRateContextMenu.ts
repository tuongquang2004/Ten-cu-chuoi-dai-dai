import { ExchangeRate } from "@/constants/types";
import { useContextMenu } from "@/hooks/useContextMenu";
import { useEffect, useState } from "react";

export function useExchangeRateContextMenu() {
  const { menuPos, handleContextMenu: baseHandleContextMenu } =
    useContextMenu();
  const [selected, setSelected] = useState<ExchangeRate | null>();

  const handleContextMenu = (row: ExchangeRate, e: React.MouseEvent) => {
    e.preventDefault();
    setSelected(row);
    baseHandleContextMenu(e);
  };

  useEffect(() => {
    if (!menuPos) {
      setSelected(null);
    }
  }, [menuPos]);

  return { selected, menuPos, handleContextMenu };
}

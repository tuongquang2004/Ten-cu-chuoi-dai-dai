import { useState, useEffect, MouseEvent } from "react";

type MenuPosition = { x: number; y: number } | null;

export function useContextMenu() {
  const [menuPos, setMenuPos] = useState<MenuPosition>(null);

  const handleContextMenu = (e: MouseEvent) => {
    e.preventDefault();
    setMenuPos({ x: e.clientX, y: e.clientY });
  };

  const handleClickOutside = () => {
    setMenuPos(null);
  };

  useEffect(() => {
    if (menuPos) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }
    return () => document.removeEventListener("click", handleClickOutside);
  }, [menuPos]);

  const hideMenu = () => setMenuPos(null);

  return { menuPos, handleContextMenu, hideMenu };
}

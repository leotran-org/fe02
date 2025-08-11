import { useMemo, useEffect } from "react";
import MEDIA_ITEMS from "../constants/media";

export function useMediaItem(id) {
  const item = useMemo(() => {
    const num = Number(id);
    return MEDIA_ITEMS.find((m) => m.id === num);
  }, [id]);

  useEffect(() => {
    if (item) document.title = `${item.title} — Media`;
  }, [item]);

  return item;
}


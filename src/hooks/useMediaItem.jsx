import { useMemo, useEffect, useCallback, useState } from "react";
import MEDIA_ITEMS from "../constants/media";

const STORAGE_KEY = "media_items";


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


function loadMediaList() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (_) {}
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(MEDIA_ITEMS));
  } catch (_) {}
  return MEDIA_ITEMS;
}

function saveMediaList(list) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch (_) {}
}

export function getMediaById(id) {
  const list = loadMediaList();
  return list.find((m) => m.id === id);
}

export function updateMediaById(id, payload) {
  const list = loadMediaList();
  const idx = list.findIndex((m) => m.id === id);
  if (idx === -1) return false;
  list[idx] = { ...list[idx], ...payload };
  saveMediaList(list);
  return true;
}

/**
 * useMediaItem
 * - Loads a single item by id and lets you refresh it.
 */
export default function useMediaItemEdit(id) {
  const [item, setItem] = useState(() => getMediaById(id));

  const refresh = useCallback(() => {
    setItem(getMediaById(id));
  }, [id]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { item, refresh, update: (payload) => updateMediaById(id, payload) };
}


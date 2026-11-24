"use client";

import { useSyncExternalStore } from "react";
import { THEME_STORAGE_KEY } from "./theme-constants";

/**
 * Visitor's interface preference. "system" follows the device setting live.
 *
 * Applied as data-theme on <html> ("light" | "dark"); for "system" the
 * attribute is removed and globals.css follows prefers-color-scheme.
 * THEME_INIT_SCRIPT (theme-constants.ts) runs in <head> before first paint so a saved choice
 * never flashes the wrong theme.
 */
export type ThemePreference = "light" | "dark" | "system";

const CHANGE_EVENT = "lp-theme-change";
const DARK_QUERY = "(prefers-color-scheme: dark)";

export const THEME_OPTIONS: { value: ThemePreference; label: string }[] = [
  { value: "light", label: "Sáng" },
  { value: "dark", label: "Tối" },
  { value: "system", label: "Theo thiết bị" },
];

function isPreference(value: unknown): value is ThemePreference {
  return value === "light" || value === "dark" || value === "system";
}

function readPreference(): ThemePreference {
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    return isPreference(stored) ? stored : "system";
  } catch {
    return "system";
  }
}

export function setThemePreference(preference: ThemePreference) {
  const root = document.documentElement;
  if (preference === "system") root.removeAttribute("data-theme");
  else root.setAttribute("data-theme", preference);
  try {
    if (preference === "system") window.localStorage.removeItem(THEME_STORAGE_KEY);
    else window.localStorage.setItem(THEME_STORAGE_KEY, preference);
  } catch {
    // Private mode / blocked storage: the choice still applies to this page view.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function subscribe(onChange: () => void) {
  const media = window.matchMedia(DARK_QUERY);
  // Another tab changed the preference: apply it here too.
  const onStorage = (event: StorageEvent) => {
    if (event.key !== THEME_STORAGE_KEY) return;
    const next = readPreference();
    if (next === "system") document.documentElement.removeAttribute("data-theme");
    else document.documentElement.setAttribute("data-theme", next);
    onChange();
  };
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener("storage", onStorage);
  media.addEventListener("change", onChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onStorage);
    media.removeEventListener("change", onChange);
  };
}

/** The saved preference; "system" during server render and hydration. */
export function useThemePreference(): ThemePreference {
  return useSyncExternalStore(subscribe, readPreference, () => "system");
}

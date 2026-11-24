"use client";

import { useId } from "react";
import { Check, Monitor, Moon, Sun } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  THEME_OPTIONS,
  setThemePreference,
  useThemePreference,
  type ThemePreference,
} from "@/lib/theme";

const ICONS: Record<ThemePreference, typeof Sun> = {
  light: Sun,
  dark: Moon,
  system: Monitor,
};

function labelOf(preference: ThemePreference) {
  return THEME_OPTIONS.find((o) => o.value === preference)?.label ?? "";
}

/** Header control: icon button opening a three-option menu. */
export function ThemeMenu() {
  const preference = useThemePreference();
  const Icon = ICONS[preference];

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger
        aria-label={`Giao diện: ${labelOf(preference)}`}
        className="inline-flex size-11 items-center justify-center rounded-sm text-foreground transition-colors duration-300 outline-none hover:bg-surface-secondary hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent data-[state=open]:bg-surface-secondary"
      >
        <Icon aria-hidden className="size-[1.125rem]" strokeWidth={1.5} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={8} className="w-52">
        <DropdownMenuLabel>Giao diện</DropdownMenuLabel>
        <DropdownMenuRadioGroup
          value={preference}
          onValueChange={(value) => setThemePreference(value as ThemePreference)}
        >
          {THEME_OPTIONS.map((option) => {
            const OptionIcon = ICONS[option.value];
            return (
              <DropdownMenuRadioItem key={option.value} value={option.value}>
                <OptionIcon aria-hidden className="size-4 text-muted" strokeWidth={1.5} />
                {option.label}
              </DropdownMenuRadioItem>
            );
          })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/**
 * Option list for the mobile drawer. Native radios give the expected
 * keyboard behaviour (one tab stop, arrow keys) for free.
 */
export function ThemeSegmented({ className }: { className?: string }) {
  const preference = useThemePreference();
  const name = useId();

  return (
    <fieldset className={className}>
      <legend className="eyebrow mb-3 text-muted">Giao diện</legend>
      <div className="flex flex-col border-y border-border">
        {THEME_OPTIONS.map((option) => {
          const Icon = ICONS[option.value];
          return (
            <label
              key={option.value}
              className="group/option flex min-h-12 cursor-pointer items-center gap-3 text-sm text-muted transition-colors duration-300 hover:text-foreground has-checked:text-foreground has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-accent"
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={preference === option.value}
                onChange={() => setThemePreference(option.value)}
                className="sr-only"
              />
              <Icon aria-hidden className="size-4" strokeWidth={1.5} />
              <span className="flex-1">{option.label}</span>
              <Check
                aria-hidden
                className="size-4 text-accent opacity-0 transition-opacity group-has-checked/option:opacity-100"
                strokeWidth={2}
              />
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

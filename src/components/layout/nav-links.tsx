"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "cn";
import { parentSite, primaryNav } from "@/data/navigation";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

/** Desktop navigation with an understated active indicator. */
export function NavLinks() {
  const pathname = usePathname();

  return (
    <ul className="flex items-center gap-10">
      {primaryNav.map((item) => {
        const active = isActive(pathname, item.href);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "relative inline-flex min-h-11 items-center text-sm transition-colors duration-300",
                "after:absolute after:inset-x-0 after:bottom-2 after:h-px after:origin-left after:bg-accent after:transition-transform after:duration-500 after:ease-soft",
                active
                  ? "text-foreground after:scale-x-100"
                  : "text-muted after:scale-x-0 hover:text-foreground hover:after:scale-x-100",
              )}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
      <li className="flex items-center gap-8">
        <span aria-hidden className="h-4 w-px bg-border" />
        <a
          href={parentSite.href}
          aria-label={parentSite.label}
          className="inline-flex min-h-11 items-center gap-2 text-sm text-muted transition-colors duration-300 hover:text-foreground"
        >
          <ParentEmblem className="size-6" />
          <span className="hidden lg:inline">{parentSite.label}</span>
        </a>
      </li>
    </ul>
  );
}

/** Rabbit Tarot's emblem on an ivory disc, so it stays legible in dark mode. */
function ParentEmblem({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex shrink-0 items-center justify-center rounded-full bg-[#f7f2ea]", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element -- tiny static icon */}
      <img src={parentSite.emblem} alt="" width={144} height={144} className="size-[82%]" />
    </span>
  );
}

/** Large serif links for the mobile sheet. `onNavigate` closes the sheet. */
export function MobileNavLinks({ onNavigate }: { onNavigate: () => void }) {
  const pathname = usePathname();

  return (
    <ul className="flex flex-col">
      {primaryNav.map((item, index) => {
        const active = isActive(pathname, item.href);
        return (
          <li key={item.href} className="border-b border-border">
            <Link
              href={item.href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className="flex items-baseline gap-4 py-5 font-display text-[2rem] leading-none text-foreground transition-colors hover:text-accent"
            >
              <span className="w-6 font-sans text-xs tabular-nums text-muted-foreground">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className={cn(active && "italic")}>{item.label}</span>
            </Link>
          </li>
        );
      })}
      <li className="border-b border-border">
        <a
          href={parentSite.href}
          className="flex items-center gap-4 py-5 text-foreground transition-colors hover:text-accent"
        >
          <span aria-hidden className="w-6 font-sans text-xs text-muted-foreground">
            ↩
          </span>
          <ParentEmblem className="size-7" />
          <span className="font-display text-2xl leading-none">{parentSite.label}</span>
        </a>
      </li>
    </ul>
  );
}

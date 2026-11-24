import {
  BookOpen,
  Brush,
  Coffee,
  Feather,
  Hourglass,
  Leaf,
  type LucideIcon,
  MapPin,
  Music,
  Palette,
  Sparkles,
  Sprout,
  Sunrise,
  Telescope,
  Users,
  HeartHandshake,
} from "lucide-react";
import { cn } from "cn";

/** One small line illustration per library category (Editorial Guidelines §4). */
const CATEGORY_ICON: Record<string, LucideIcon> = {
  "A Quiet Mind": Feather,
  "The Art of Living": Coffee,
  "Nature Notes": Leaf,
  "The World of Art": Palette,
  "Little Journeys": MapPin,
  "Human Stories": Users,
  "Time & Memory": Hourglass,
  "Music & Sound": Music,
  "Creative Life": Brush,
  "Small Joys": Sparkles,
  "Relationships & Connections": HeartHandshake,
  "Change & New Beginnings": Sprout,
  "Science & Curiosity": Telescope,
  "Philosophy & Perspective": BookOpen,
  "Tomorrow & Possibility": Sunrise,
};

export function CategoryIcon({ category, className }: { category: string; className?: string }) {
  const Icon = CATEGORY_ICON[category] ?? Feather;
  return <Icon aria-hidden className={className} strokeWidth={1.5} />;
}

/** Perforated postage stamp showing the message's category. */
export function PostcardStamp({ category, number, className }: { category: string; number: string; className?: string }) {
  const Icon = CATEGORY_ICON[category] ?? Feather;
  return (
    <div aria-hidden className={cn("postcard-stamp", className)}>
      <div className="flex h-full flex-col items-center justify-between border border-accent/35 px-1.5 pt-2 pb-1.5 text-accent">
        <span className="self-end font-display text-sm leading-none tabular-nums">{number}</span>
        <Icon className="size-7" strokeWidth={1.25} />
        <span className="text-center text-[0.5rem] leading-tight tracking-[0.14em] uppercase">{category}</span>
      </div>
    </div>
  );
}

/** Round postmark: "LITTLE POSTCARD" around the rim, the date in the middle, wavy cancel lines. */
export function Postmark({ day, month, year, className }: { day: string; month: string; year: string; className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 220 120" className={cn("text-accent", className)}>
      <defs>
        <path id="pm-rim" d="M 60 60 m -40 0 a 40 40 0 1 1 80 0 a 40 40 0 1 1 -80 0" />
      </defs>
      <g fill="none" stroke="currentColor" strokeWidth="1.3">
        <circle cx="60" cy="60" r="50" />
        <circle cx="60" cy="60" r="31" />
        {[0, 1, 2, 3].map((i) => (
          <path key={i} d={`M 118 ${36 + i * 16} q 12 -7 24 0 t 24 0 t 24 0 t 24 0`} />
        ))}
      </g>
      <text fill="currentColor" fontSize="9.5" letterSpacing="2.6" fontFamily="var(--font-inter), sans-serif">
        <textPath href="#pm-rim">LITTLE POSTCARD · VIỆT NAM ·</textPath>
      </text>
      <text x="60" y="56" textAnchor="middle" fill="currentColor" fontSize="15" fontFamily="var(--font-cormorant), serif">
        {day}·{month}
      </text>
      <text x="60" y="72" textAnchor="middle" fill="currentColor" fontSize="10" letterSpacing="1.5" fontFamily="var(--font-inter), sans-serif">
        {year}
      </text>
    </svg>
  );
}

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
import { asset } from "@/lib/asset";

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

/** Category → hand-painted stamp illustration in public/images/stamps (generated with Higgsfield). */
function stampImage(category: string) {
  const slug = category.toLowerCase().replace(/[^a-z]+/g, "-").replace(/^-|-$/g, "");
  return asset(`/images/stamps/${slug in KNOWN ? slug : "a-quiet-mind"}.jpg`);
}
const KNOWN = Object.fromEntries(
  Object.keys(CATEGORY_ICON).map((c) => [c.toLowerCase().replace(/[^a-z]+/g, "-").replace(/^-|-$/g, ""), true]),
);

/** Perforated postage stamp: a small gouache painting for the message's category, with the day as its value. */
export function PostcardStamp({
  category,
  number,
  size = "sm",
  className,
}: {
  category: string;
  number: string;
  size?: "sm" | "lg";
  className?: string;
}) {
  return (
    <div aria-hidden className={cn("postcard-stamp", size === "lg" && "postcard-stamp--lg", className)}>
      <div className="relative h-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element -- tiny decorative image, static export */}
        <img src={stampImage(category)} alt="" loading="lazy" className="size-full object-cover" />
        <span className="absolute top-1 right-1 bg-[#fdfbf6]/90 px-1 font-display text-[0.8rem] leading-tight text-[#7a4a39] tabular-nums">
          {number}
        </span>
        <span className="absolute inset-x-0 bottom-0 bg-[#fdfbf6]/88 px-1 py-0.5 text-center text-[0.45rem] leading-tight tracking-[0.12em] text-[#7a4a39] uppercase">
          {category}
        </span>
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

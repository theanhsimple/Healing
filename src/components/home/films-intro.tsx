import { Film } from "lucide-react";
import { ArrowLink } from "@/components/ui/arrow-link";
import { Container } from "@/components/ui/container";
import { routes } from "@/lib/routes";

/** Home: opens the separate "Thước phim" area, below the podcast. */
export function FilmsIntro() {
  return (
    <section aria-labelledby="films-intro" className="border-t border-border bg-surface">
      <Container className="flex flex-col gap-6 py-14 md:flex-row md:items-end md:justify-between md:py-20">
        <div className="max-w-2xl">
          <p className="eyebrow flex items-center gap-2 text-accent">
            <Film aria-hidden className="size-3.5" strokeWidth={1.75} />
            Thước phim
          </p>
          <h2 id="films-intro" className="mt-4 font-display text-display-xl font-medium text-balance">
            Những thước phim ngắn.
          </h2>
          <p className="mt-5 max-w-xl leading-relaxed text-pretty text-muted">
            Một góc riêng cho những đoạn phim nhỏ về thiên nhiên, tiếng nước và ánh sáng — để dừng
            lại vài chục giây giữa ngày.
          </p>
        </div>
        <ArrowLink href={routes.library()}>Xem tất cả thước phim</ArrowLink>
      </Container>
    </section>
  );
}

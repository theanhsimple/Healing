import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { asset } from "@/lib/asset";
import { HeroVideo } from "./hero-video";

interface HeroLink {
  href: string;
  label: string;
}

interface HeroSectionProps {
  /** Main call to action (the podcast). */
  primary: HeroLink;
  /** Secondary call to action (the films). */
  secondary: HeroLink;
}

export function HeroSection({ primary, secondary }: HeroSectionProps) {
  return (
    <section aria-labelledby="hero-title" className="pt-3 md:pt-6 lg:pt-8">
      <Container>
        <div className="film-grain relative isolate aspect-[4/5] overflow-hidden bg-media sm:aspect-[16/10] lg:aspect-[21/9]">
          <HeroVideo
            src={asset("/media/hero-be-tre.mp4")}
            poster={asset("/images/hero-be-tre.jpg")}
            className="absolute inset-0 -z-10 size-full object-cover object-[50%_60%]"
          />
          <span className="sr-only">Một chiếc bè tre trôi chậm trên mặt sông phẳng lặng, núi xanh và mây phía xa</span>
          {/* Subtle scrim: keeps white text legible without flattening the image */}
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(23,25,22,0.8)_0%,rgba(23,25,22,0.5)_45%,rgba(23,25,22,0.35)_100%)] sm:bg-[linear-gradient(to_top,rgba(23,25,22,0.72)_0%,rgba(23,25,22,0.32)_42%,rgba(23,25,22,0.08)_70%)]"
          />

          <div className="flex h-full flex-col justify-end p-6 sm:p-10 lg:p-12">
            <div className="animate-on-load max-w-[40rem]">
              <p className="font-display text-lg italic text-white/80 md:text-xl">
                A little place to pause.
              </p>
              <h1
                id="hero-title"
                className="mt-3 font-display text-display-xl font-medium text-balance text-white"
              >
                Một nơi để ta dừng lại.
              </h1>
              <p className="mt-5 max-w-md text-[0.9375rem] leading-relaxed text-pretty text-white/85 md:text-base">
                Những thước phim nhỏ, những khoảnh khắc dịu dàng và những điều đẹp đẽ vẫn
                luôn hiện diện quanh ta.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button asChild variant="inverse" size="lg">
                  <Link href={primary.href}>{primary.label}</Link>
                </Button>
                <Button asChild variant="outline-inverse" size="lg">
                  <Link href={secondary.href}>{secondary.label}</Link>
                </Button>
              </div>
            </div>
          </div>

          <p
            aria-hidden
            className="absolute top-6 right-6 hidden text-[0.6875rem] tracking-[0.18em] text-white/65 uppercase sm:block lg:top-auto lg:right-14 lg:bottom-14"
          >
            N° 01 — Bè tre trên sông lặng
          </p>
        </div>
      </Container>
    </section>
  );
}

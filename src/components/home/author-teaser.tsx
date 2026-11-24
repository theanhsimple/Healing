import Image from "next/image";
import { ArrowLink } from "@/components/ui/arrow-link";
import { Container } from "@/components/ui/container";
import { author } from "@/data/author";
import { routes } from "@/lib/routes";

/** Home: a short "who is behind this" block linking to the full story. */
export function AuthorTeaser() {
  return (
    <section aria-labelledby="author-teaser" className="border-t border-border py-14 md:py-20">
      <Container className="flex flex-col gap-8 sm:flex-row sm:items-center sm:gap-10">
        <div className="relative aspect-[3/4] w-32 shrink-0 overflow-hidden bg-media md:w-40">
          <Image
            src={author.photo.src}
            alt={author.photo.alt}
            fill
            sizes="160px"
            className="object-cover object-[50%_25%]"
          />
        </div>
        <div className="max-w-2xl">
          <p className="eyebrow text-accent">Người gửi những tấm bưu thiếp</p>
          <h2 id="author-teaser" className="mt-3 font-display text-display-md font-medium">
            {author.name}
            <span className="ml-3 align-middle font-sans text-sm font-normal text-muted">{author.role}</span>
          </h2>
          <p className="mt-3 font-display text-xl leading-snug italic text-foreground/80">“{author.title}”</p>
          <p className="mt-3 text-sm leading-relaxed text-muted">{author.here}</p>
          <ArrowLink href={`${routes.about}#rabbit`} className="mt-5">
            Về Rabbit
          </ArrowLink>
        </div>
      </Container>
    </section>
  );
}

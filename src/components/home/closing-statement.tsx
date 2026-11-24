import { Container } from "@/components/ui/container";

export function ClosingStatement() {
  return (
    <section aria-label="Lời nhắn" className="border-t border-border bg-surface py-16 md:py-20 lg:py-24">
      <Container className="reveal flex flex-col items-center text-center">
        <span aria-hidden className="mb-8 block h-10 w-px bg-accent/60" />
        <blockquote className="max-w-3xl">
          <p className="font-display text-display-lg font-normal italic text-balance text-foreground">
            “Mong rằng, giữa những ngày bận rộn, bạn vẫn tìm được một khoảng nhỏ dành riêng
            cho mình.”
          </p>
        </blockquote>
        <p className="eyebrow mt-6 text-muted">— Little Postcard</p>
      </Container>
    </section>
  );
}

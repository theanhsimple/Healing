import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { author } from "@/data/author";
import { routes } from "@/lib/routes";
import { asset } from "@/lib/asset";

export const metadata: Metadata = {
  title: "Giới thiệu",
  description:
    "Little Postcard gồm podcast Những điều nhỏ bé — những tấm bưu thiếp bằng âm thanh — và một góc thước phim ngắn về thiên nhiên, ánh sáng và những khoảnh khắc đời thường.",
};

const pillars = [
  {
    title: "Thiên nhiên",
    image: asset("/images/editorial/forest.jpg"),
    alt: "Nắng chiều xuyên qua rừng thông",
    text: "Rừng, núi, mặt hồ, sương sớm. Thiên nhiên không vội, và khi đứng trước nó, ta cũng thôi vội theo.",
  },
  {
    title: "Âm nhạc",
    image: asset("/images/editorial/sea.jpg"),
    alt: "Mặt biển lên xuống chậm rãi",
    text: "Tiếng nước chảy, tiếng sóng, tiếng gió qua tán lá. Có những thước phim nên được nghe nhiều hơn là xem.",
  },
  {
    title: "Nghệ thuật",
    image: asset("/images/editorial/layered-mountains.jpg"),
    alt: "Những lớp núi nhạt dần trong ánh hoàng hôn",
    text: "Ánh sáng, màu sắc, bố cục — nghệ thuật vẫn ở đó trong đời thường, chỉ chờ một ánh nhìn đủ chậm.",
  },
  {
    title: "Cuộc sống",
    image: asset("/images/editorial/cabin.jpg"),
    alt: "Căn nhà nhỏ mái đỏ trên đồi",
    text: "Một mái nhà, một buổi chiều, một con đường quen. Những điều nhỏ bé làm nên cả một đời người.",
  },
] as const;

const beliefs = [
  {
    title: "Chậm là đủ",
    text: "Không cần xem hết, không cần xem nhanh. Một thước phim ngắn, xem trọn vẹn, có khi đáng giá hơn cả một buổi chiều lướt qua màn hình.",
  },
  {
    title: "Ít mà thật",
    text: "Mỗi câu chuyện, mỗi khung hình đều thật và giản dị. Không kịch bản phô trương, không hiệu ứng thừa.",
  },
  {
    title: "Không đòi hỏi gì",
    text: "Không thông báo, không chuỗi ngày, không thuật toán thúc giục. Bạn đến khi cần, và rời đi khi đã đủ.",
  },
  {
    title: "Lắng nghe nhiều hơn",
    text: "Tắt bớt âm thanh của một ngày ồn ào để nghe tiếng nước, tiếng gió — và nghe lại chính mình.",
  },
] as const;

export default function AboutPage() {
  return (
    <>
      {/* Opening */}
      <Container className="editorial-grid gap-y-8 pt-14 pb-12 md:pt-20 md:pb-16 lg:pt-24">
        <div className="col-span-4 md:col-span-8 lg:col-span-8">
          <p className="eyebrow text-accent">Giới thiệu</p>
          <h1 className="mt-4 font-display text-display-xl font-medium text-balance">
            Một nơi để ta dừng lại.
          </h1>
        </div>
        <p className="col-span-4 self-end font-display text-xl leading-snug italic text-muted md:col-span-6 lg:col-span-4">
          A little place to pause — những câu chuyện nhỏ và những thước phim ngắn, gửi đến bạn
          giữa những ngày bận rộn.
        </p>
      </Container>

      <Container>
        <figure>
          <div className="relative aspect-[4/5] overflow-hidden bg-media sm:aspect-[16/9] lg:aspect-[21/9]">
            <Image
              src={asset("/images/editorial/fog-hills.jpg")}
              alt="Sương sớm phủ trên những sườn đồi khi mặt trời vừa lên"
              fill
              preload
              sizes="(min-width: 1376px) 1280px, 100vw"
              className="object-cover"
            />
          </div>
          <figcaption className="mt-3 text-xs text-muted">Sương sớm trên đồi.</figcaption>
        </figure>
      </Container>

      {/* What it is */}
      <section aria-labelledby="what-title" className="py-20 md:py-28 lg:py-36">
        <Container className="editorial-grid gap-y-8">
          <h2
            id="what-title"
            className="col-span-4 font-display text-display-md font-medium text-balance md:col-span-8 lg:col-span-4"
          >
            Little Postcard là gì?
          </h2>
          <div className="col-span-4 flex flex-col gap-5 text-[1.0625rem] leading-relaxed text-foreground/80 md:col-span-8 lg:col-span-6 lg:col-start-6">
            <p>Little Postcard có hai góc nhỏ.</p>
            <p>
              <Link
                href={routes.podcast}
                className="font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-accent"
              >
                Podcast “Những điều nhỏ bé”
              </Link>{" "}
              — The Little Postcard Project — là những tấm bưu thiếp bằng âm thanh. Mỗi tập năm đến
              bảy phút, một câu chuyện nhỏ về thiên nhiên, âm nhạc, nghệ thuật, những chuyến đi chưa
              thực hiện và những điều đáng mong chờ trong tuần mới. Phát hành vào thứ Ba, thứ Năm và
              Chủ Nhật.
            </p>
            <p>
              <Link
                href={routes.library()}
                className="font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-accent"
              >
                Thước phim
              </Link>{" "}
              là một góc riêng cho những đoạn phim ngắn — vài chục giây về một mặt hồ, một con suối,
              một buổi hoàng hôn. Không lời bình, không câu chuyện phải theo dõi — chỉ có khoảnh khắc
              ấy, nguyên vẹn như lúc nó diễn ra.
            </p>
          </div>
        </Container>
      </section>

      {/* The person behind it */}
      <section
        id="rabbit"
        aria-labelledby="rabbit-title"
        className="scroll-mt-[calc(var(--header-height)+16px)] border-t border-border py-20 md:py-28 lg:py-32"
      >
        <Container className="editorial-grid items-center gap-y-10">
          <div className="col-span-4 md:col-span-3 lg:col-span-4">
            <div className="relative aspect-[3/4] overflow-hidden bg-media">
              <Image
                src={author.photo.src}
                alt={author.photo.alt}
                fill
                sizes="(min-width: 1376px) 405px, (min-width: 1024px) 30vw, (min-width: 768px) 36vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
          <div className="col-span-4 md:col-span-5 lg:col-span-7 lg:col-start-6">
            <p className="eyebrow text-accent">Người gửi những tấm bưu thiếp</p>
            <h2 id="rabbit-title" className="mt-4 font-display text-display-lg font-medium">
              {author.name}
            </h2>
            <p className="mt-2 text-sm text-muted">
              {author.role} · Lá bài {author.card}
            </p>
            <p className="mt-8 font-display text-display-sm leading-snug italic text-balance">
              “{author.title}”
            </p>
            <div className="mt-8 flex flex-col gap-5 text-[1.0625rem] leading-relaxed text-foreground/80">
              <p>{author.bio}</p>
              <p>{author.here}</p>
            </div>
            <a
              href={author.link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group/arrow mt-8 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-foreground underline-offset-[6px] transition-colors hover:text-accent hover:underline"
            >
              Xem bài Tarot cùng Rabbit tại {author.link.label}
              <ArrowUpRight
                aria-hidden
                className="size-4 transition-transform duration-300 group-hover/arrow:translate-x-0.5 group-hover/arrow:-translate-y-0.5"
              />
            </a>
          </div>
        </Container>
      </section>

      {/* Why */}
      <section aria-labelledby="why-title" className="bg-surface-secondary py-20 md:py-28 lg:py-36">
        <Container className="editorial-grid gap-y-10">
          <div className="col-span-4 md:col-span-8 lg:col-span-7">
            <h2 id="why-title" className="eyebrow text-muted">
              Vì sao có Little Postcard
            </h2>
            <blockquote className="mt-6">
              <p className="font-display text-display-lg italic text-balance">
                “Có những ngày, điều ta cần chỉ là được nhìn mặt nước thêm một phút.”
              </p>
            </blockquote>
          </div>
          <div className="col-span-4 flex flex-col gap-5 self-end text-[1.0625rem] leading-relaxed text-foreground/80 md:col-span-8 lg:col-span-4 lg:col-start-9">
            <p>
              Màn hình của chúng ta ngày càng nhanh và ồn. Little Postcard ra đời từ mong muốn có
              một góc nhỏ đi ngược lại điều đó — nơi không có gì cần đuổi theo.
            </p>
            <p>
              Một nơi để mở ra khi mệt, khi chờ, khi khó ngủ, hay đơn giản là khi muốn nhớ rằng thế
              giới ngoài kia vẫn đang đẹp theo cách lặng lẽ của nó.
            </p>
          </div>
        </Container>
      </section>

      {/* Nature, music, art, life */}
      <section aria-labelledby="pillars-title" className="py-20 md:py-28 lg:py-36">
        <Container>
          <div className="max-w-2xl">
            <p className="eyebrow text-muted">Những điều chúng mình gìn giữ</p>
            <h2
              id="pillars-title"
              className="mt-4 font-display text-display-lg font-medium text-balance"
            >
              Thiên nhiên, âm nhạc, nghệ thuật và cuộc sống.
            </h2>
          </div>
          <ul className="mt-14 grid grid-cols-1 gap-x-8 gap-y-16 md:mt-20 md:grid-cols-2 lg:gap-x-12 lg:gap-y-20">
            {pillars.map((pillar, index) => (
              <li key={pillar.title} className={index % 2 === 1 ? "md:mt-24" : undefined}>
                <div className="relative aspect-[4/5] overflow-hidden bg-media">
                  <Image
                    src={pillar.image}
                    alt={pillar.alt}
                    fill
                    sizes="(min-width: 1376px) 616px, (min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="mt-6 flex items-baseline gap-4">
                  <span className="text-xs text-muted-foreground tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-display-md font-medium">{pillar.title}</h3>
                    <p className="mt-3 max-w-md leading-relaxed text-muted">{pillar.text}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Philosophy */}
      <section aria-labelledby="beliefs-title" className="border-t border-border py-20 md:py-28 lg:py-36">
        <Container className="editorial-grid gap-y-12">
          <div className="col-span-4 md:col-span-8 lg:col-span-4">
            <div className="relative aspect-[3/4] overflow-hidden bg-media max-lg:hidden">
              <Image
                src={asset("/images/editorial/still-lake.jpg")}
                alt="Núi soi bóng xuống mặt hồ phẳng lặng"
                fill
                sizes="(min-width: 1376px) 405px, 30vw"
                className="object-cover"
              />
            </div>
          </div>
          <div className="col-span-4 md:col-span-8 lg:col-span-7 lg:col-start-6">
            <p className="eyebrow text-muted">Triết lý</p>
            <h2 id="beliefs-title" className="mt-4 font-display text-display-lg font-medium text-balance">
              Điều chúng mình tin.
            </h2>
            <ol className="mt-12 border-t border-border">
              {beliefs.map((belief, index) => (
                <li
                  key={belief.title}
                  className="grid grid-cols-[2rem_1fr] gap-x-4 border-b border-border py-7 md:grid-cols-[3rem_1fr] md:gap-x-6"
                >
                  <span className="pt-2 text-xs text-muted-foreground tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-display-sm font-medium">{belief.title}</h3>
                    <p className="mt-2 leading-relaxed text-muted">{belief.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* Closing */}
      <section aria-label="Lời mời" className="border-t border-border bg-surface py-24 md:py-32">
        <Container className="flex flex-col items-center text-center">
          <span aria-hidden className="mb-10 block h-12 w-px bg-accent/60" />
          <p className="max-w-2xl font-display text-display-lg italic text-balance">
            Hôm nay, bạn muốn dừng lại ở đâu?
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link href={routes.podcast}>Nghe podcast</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href={routes.library()}>Xem thước phim</Link>
            </Button>
          </div>
          <p className="mt-16 max-w-md text-xs leading-relaxed text-muted">
            Hình ảnh và thước phim từ Mixkit (giấy phép Mixkit Free License) — nguồn của từng thước phim
            được ghi trên trang của nó. Nhạc nền: “Four-Note Motif”.
          </p>
        </Container>
      </section>
    </>
  );
}

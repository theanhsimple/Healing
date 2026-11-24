import { asset } from "@/lib/asset";
import { routes } from "@/lib/routes";

export interface NavItem {
  href: string;
  label: string;
}

export const primaryNav: NavItem[] = [
  { href: routes.home, label: "Trang chủ" },
  { href: routes.podcast, label: "Podcast" },
  { href: routes.library(), label: "Thước phim" },
  { href: routes.about, label: "Giới thiệu" },
];

/**
 * The one link back to the parent site, shown at the end of the header nav
 * (desktop) and of the menu sheet (mobile). Absolute, so it works the same
 * on rabbittarot.io.vn/healing and on the github.io preview.
 */
export const parentSite = {
  href: "https://rabbittarot.io.vn/",
  label: "Rabbit Tarot",
  emblem: asset("/images/brand/rabbit-tarot-emblem.png"),
};

export const footerNav: { heading: string; links: NavItem[] }[] = [
  {
    heading: "Khám phá",
    links: [
      { href: routes.podcast, label: "Podcast" },
      { href: routes.library(), label: "Thước phim" },
      { href: routes.search(), label: "Tìm kiếm" },
    ],
  },
  {
    heading: "Little Postcard",
    links: [
      { href: routes.home, label: "Trang chủ" },
      { href: routes.about, label: "Giới thiệu" },
    ],
  },
];

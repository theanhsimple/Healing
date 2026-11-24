/**
 * DEVELOPMENT MOCK DATA — not production content.
 *
 * Read only through `createMockRepository` (src/lib/content), which is used
 * when CONTENT_SOURCE=mock or in `next dev` with no source set. A production
 * build without CONTENT_SOURCE fails instead of falling back to this file.
 *
 * Footage: hand-picked clips from Mixkit (mixkit.co, Mixkit Free License),
 * trimmed and re-encoded to 720p H.264 in public/media. Each thumbnail is a
 * frame from its own clip. Credits are shown on the postcard page.
 * The draft and private entries exist to verify they never appear publicly;
 * their thumbnails are Unsplash photos (unsplash.com/license).
 */
import type { MediaCredit, Video } from "@/types/video";
import { asset } from "@/lib/asset";

const credits = {
  sixes: { title: "Sixes River", author: "BLM Oregon & Washington", sourceUrl: "https://commons.wikimedia.org/wiki/File:Sixes_River_(33895113543).webm", license: "Phạm vi công cộng" },
} satisfies Record<string, MediaCredit>;

/** Mixkit Stock Video Free License: free to use, no attribution required — credited anyway. */
const mixkit = (title: string, sourceUrl: string): MediaCredit => ({
  title,
  author: "Mixkit",
  license: "Mixkit Free License",
  licenseUrl: "https://mixkit.co/license/#videoFree",
  sourceUrl,
});

const media = (slug: string) => ({
  thumbnailUrl: asset(`/images/postcards/${slug}.jpg`),
  playbackUrl: asset(`/media/${slug}.mp4`),
});

const published = { status: "published", visibility: "public", isFeatured: false } as const;

export const videos: Video[] = [
  {
    id: "pc-120",
    slug: "hoang-hon-giua-nhung-dao-da",
    title: "Hoàng hôn giữa những đảo đá",
    shortDescription: "Mặt trời lặn sau dãy núi đá vôi, mặt hồ ôm lấy từng hòn đảo nhỏ.",
    description:
      "Từ trên cao, mặt trời khuất dần sau những đỉnh núi đá vôi, tia nắng cuối ngày xòe ra như nan quạt. Mặt nước phẳng lặng ôm lấy từng hòn đảo xanh thẫm. Mười giây để ngày hôm nay khép lại thật chậm.",
    ...media("hoang-hon-giua-nhung-dao-da"),
    durationSeconds: 10,
    categoryId: "cat_travel",
    moodIds: ["mood_hope", "mood_calm"],
    publishedAt: "2026-11-23T18:00:00+07:00",
    ...published,
    credit: mixkit("Beautiful sunset on a bay from above", "https://mixkit.co/free-stock-video/beautiful-sunset-on-a-bay-from-above-4999/"),
  },
  {
    id: "pc-119",
    slug: "mua-va-nang-tren-la",
    title: "Mưa bóng mây trên lá",
    shortDescription: "Mưa vẫn rơi trong khi nắng đã len qua tán cây.",
    description:
      "Mưa còn lất phất trên những chiếc lá non thì nắng đã len qua cành cây, biến từng giọt nước thành một đốm sáng. Tiếng mưa nhỏ dần, ánh sáng ấm dần. Một khoảnh khắc nửa mưa nửa nắng rất quen của mùa hạ.",
    ...media("mua-va-nang-tren-la"),
    durationSeconds: 24,
    categoryId: "cat_music",
    moodIds: ["mood_relax", "mood_hope"],
    publishedAt: "2026-11-22T16:00:00+07:00",
    ...published,
    credit: mixkit("Soft rain and sun shine", "https://mixkit.co/free-stock-video/soft-rain-and-sun-shine-25375/"),
  },
  {
    id: "pc-118",
    slug: "tach-tra-boc-khoi",
    title: "Tách trà bốc khói",
    shortDescription: "Hơi ấm bay lên từ chiếc tách, nắng sớm rọi nghiêng.",
    description:
      "Chiếc tách đặt trên mặt bàn phủ tuyết, hơi nóng bốc lên thành từng làn mỏng trong nắng sớm. Không có gì xảy ra cả, chỉ là một buổi sáng lạnh và một thứ gì đó ấm để cầm trên tay.",
    ...media("tach-tra-boc-khoi"),
    durationSeconds: 12,
    categoryId: "cat_moments",
    moodIds: ["mood_nostalgia", "mood_relax"],
    publishedAt: "2026-11-21T07:30:00+07:00",
    ...published,
    credit: mixkit("Hot beverage and steam outdoors", "https://mixkit.co/free-stock-video/hot-beverage-and-steam-outdoors-24363/"),
  },
  {
    id: "pc-117",
    slug: "suong-troi-tren-nui-xanh",
    title: "Sương trôi trên núi xanh",
    shortDescription: "Mây là là trên sườn núi, những thửa ruộng nhỏ lấp ló bên dưới.",
    description:
      "Mây sà xuống thật thấp, vắt ngang đỉnh núi phủ kín rừng xanh. Bên dưới là những thửa ruộng, vài mái nhà nhỏ như hạt đậu. Một sườn núi đứng yên, chỉ có mây là đang đi.",
    ...media("suong-troi-tren-nui-xanh"),
    durationSeconds: 20,
    categoryId: "cat_nature",
    moodIds: ["mood_calm", "mood_relax"],
    publishedAt: "2026-11-20T09:00:00+07:00",
    ...published,
    credit: mixkit("Lush Green Mountains Under Cloudy Skies", "https://mixkit.co/free-stock-video/lush-green-mountains-under-cloudy-skies-100415/"),
  },
  {
    id: "pc-116",
    slug: "mua-roi-mat-ho",
    title: "Mưa rơi mặt hồ",
    shortDescription: "Từng giọt mưa vẽ những vòng tròn lan ra trên mặt nước.",
    description:
      "Cận cảnh mặt hồ khi trời mưa: mỗi giọt rơi xuống mở ra một vòng tròn, vòng này chồng lên vòng kia, phản chiếu tán cây xanh phía trên. Mười lăm giây để chỉ nghe mưa.",
    ...media("mua-roi-mat-ho"),
    durationSeconds: 15,
    categoryId: "cat_music",
    moodIds: ["mood_quiet", "mood_calm"],
    publishedAt: "2026-11-19T15:00:00+07:00",
    ...published,
    credit: mixkit("Rain falling on the water of a lake seen up close", "https://mixkit.co/free-stock-video/rain-falling-on-the-water-of-a-lake-seen-up-18312/"),
  },
  {
    id: "pc-115",
    slug: "dan-chim-tren-bien-som",
    title: "Đàn chim trên biển sớm",
    shortDescription: "Mặt trời lên, đàn chim biển bay ngang vệt sáng trên mặt nước.",
    description:
      "Mặt trời vừa lên khỏi đường chân trời, rải một vệt sáng dài trên mặt biển. Đàn chim biển chao lượn ngang qua, lúc gần lúc xa. Một buổi sáng mở ra rộng hơn mọi ngày.",
    ...media("dan-chim-tren-bien-som"),
    durationSeconds: 16,
    categoryId: "cat_moments",
    moodIds: ["mood_hope", "mood_inspired"],
    publishedAt: "2026-11-18T06:00:00+07:00",
    ...published,
    credit: mixkit("Seagulls against the horizon", "https://mixkit.co/free-stock-video/seagulls-against-the-horizon-15209/"),
  },
  {
    id: "pc-114",
    slug: "nang-qua-tan-la-thu",
    title: "Nắng qua tán lá thu",
    shortDescription: "Nắng chiều xuyên qua lớp lá vàng cam, lấp lánh theo từng cơn gió.",
    description:
      "Ống kính trôi chậm dưới tán cây mùa thu, nắng chiều xuyên qua lớp lá vàng cam thành những đốm sáng nhảy múa. Màu sắc ấm đến mức gần như có thể chạm vào.",
    ...media("nang-qua-tan-la-thu"),
    durationSeconds: 10,
    categoryId: "cat_art",
    moodIds: ["mood_inspired", "mood_nostalgia"],
    publishedAt: "2026-11-17T16:30:00+07:00",
    ...published,
    credit: mixkit("Leaves of a tree in autumn under the sun", "https://mixkit.co/free-stock-video/leaves-of-a-tree-in-autumn-under-the-sun-27163/"),
  },
  {
    id: "pc-113",
    slug: "con-suoi-nho-giua-rung",
    title: "Con suối nhỏ giữa rừng",
    shortDescription: "Nước chảy qua những tảng đá phủ rêu, trong veo và mát lạnh.",
    description:
      "Một con suối nhỏ trong rừng, nước chảy qua từng bậc đá phủ rêu rồi đổ vào vũng nước trong. Âm thanh đều đặn, không vội vàng, như một bài hát không có lời.",
    ...media("con-suoi-nho-giua-rung"),
    durationSeconds: 20,
    categoryId: "cat_music",
    moodIds: ["mood_relax"],
    publishedAt: "2026-11-16T10:00:00+07:00",
    ...published,
    credit: mixkit("Little rocky river in the woods", "https://mixkit.co/free-stock-video/little-rocky-river-in-the-woods-18162/"),
  },
  {
    id: "pc-112",
    slug: "suong-som-tren-rung",
    title: "Sương sớm trên rừng",
    shortDescription: "Lớp sương mỏng lững lờ trôi trên những ngọn cây.",
    description:
      "Bay chậm qua một cánh rừng lúc rạng sáng, sương trắng còn vương trên ngọn thông và từ từ tan ra trong ánh sáng đầu ngày. Cả khu rừng như còn đang ngủ.",
    ...media("suong-som-tren-rung"),
    durationSeconds: 15,
    categoryId: "cat_nature",
    moodIds: ["mood_quiet", "mood_nostalgia"],
    publishedAt: "2026-11-15T06:30:00+07:00",
    ...published,
    credit: mixkit("Slow aerial tour through a mist-covered forest", "https://mixkit.co/free-stock-video/slow-aerial-tour-through-a-mist-covered-forest-28342/"),
  },
  {
    id: "pc-111",
    slug: "anh-vang-tren-mat-nuoc",
    title: "Ánh vàng trên mặt nước",
    shortDescription: "Mặt nước gợn sóng giữ lại những vệt nắng vàng.",
    description:
      "Cận cảnh mặt nước xanh thẫm gợn nhẹ, mỗi đợt sóng nhỏ bắt lấy một vệt nắng rồi buông ra. Một bức tranh trừu tượng tự vẽ lại mỗi giây.",
    ...media("anh-vang-tren-mat-nuoc"),
    durationSeconds: 11,
    categoryId: "cat_art",
    moodIds: ["mood_calm", "mood_relax"],
    publishedAt: "2026-11-14T17:00:00+07:00",
    ...published,
    credit: mixkit("Close-Up of Sunlit Water Ripple", "https://mixkit.co/free-stock-video/close-up-of-sunlit-water-ripple-101192/"),
  },
  {
    id: "pc-110",
    slug: "ho-lang-duoi-chan-nui",
    title: "Hồ lặng dưới chân núi",
    shortDescription: "Mặt hồ phẳng như gương, nắng chiều rải bạc dưới chân núi.",
    description:
      "Lướt chậm trên mặt hồ dưới chân một dãy núi xanh, vài mái nhà và cầu tàu gỗ nép bên bờ. Nắng chiều rải bạc trên mặt nước. Một nơi mà ai đi qua cũng muốn ở lại thêm một ngày.",
    ...media("ho-lang-duoi-chan-nui"),
    durationSeconds: 20,
    categoryId: "cat_travel",
    moodIds: ["mood_relax", "mood_calm"],
    publishedAt: "2026-11-13T16:00:00+07:00",
    ...published,
    credit: mixkit("Drone Shot Over Hills and Dock", "https://mixkit.co/free-stock-video/drone-shot-over-hills-and-dock-101506/"),
  },
  {
    id: "pc-109",
    slug: "mot-ngon-nen-nho",
    title: "Một ngọn nến nhỏ",
    shortDescription: "Ngọn lửa nhỏ lay động trong bóng tối.",
    description:
      "Một ngọn nến trong căn phòng tối, ngọn lửa khẽ nghiêng rồi đứng thẳng, nghiêng rồi lại đứng thẳng. Hai mươi giây để nhìn một thứ thật nhỏ, thật lâu.",
    ...media("mot-ngon-nen-nho"),
    durationSeconds: 20,
    categoryId: "cat_reflection",
    moodIds: ["mood_quiet", "mood_calm"],
    publishedAt: "2026-11-12T21:00:00+07:00",
    ...published,
    credit: mixkit("Candle flame on black background closeup", "https://mixkit.co/free-stock-video/candle-flame-on-black-background-closeup-48919/"),
  },
  {
    id: "pc-108",
    slug: "trang-sach-lat-trong-gio",
    title: "Trang sách lật trong gió",
    shortDescription: "Một cơn gió nhẹ lật từng trang cuốn sách đang mở dở.",
    description:
      "Cuốn sách mở giữa chừng trên bàn, gió khẽ lật qua từng trang, phía sau là những chồng sách cũ. Như thể ai đó vừa đứng dậy và sẽ quay lại đọc tiếp.",
    ...media("trang-sach-lat-trong-gio"),
    durationSeconds: 12,
    categoryId: "cat_reflection",
    moodIds: ["mood_nostalgia", "mood_quiet"],
    publishedAt: "2026-11-11T14:00:00+07:00",
    ...published,
    credit: mixkit("Stacked and piled books taken close up", "https://mixkit.co/free-stock-video/stacked-and-piled-books-taken-close-up-21587/"),
  },
  {
    id: "pc-107",
    slug: "song-vo-luc-chieu-ta",
    title: "Sóng vỗ lúc chiều tà",
    shortDescription: "Những con sóng nhỏ vỗ vào bờ cát nhuộm màu hoàng hôn.",
    description:
      "Bãi biển lúc chiều tà, những con sóng nhỏ trườn lên bờ cát rồi rút về, bầu trời chuyển dần từ cam sang tím. Tám giây, nhưng đủ để nghe thấy tiếng biển.",
    ...media("song-vo-luc-chieu-ta"),
    durationSeconds: 8,
    categoryId: "cat_music",
    moodIds: ["mood_calm", "mood_nostalgia"],
    publishedAt: "2026-11-10T17:30:00+07:00",
    ...published,
    credit: mixkit("Sunset from a peaceful beach", "https://mixkit.co/free-stock-video/sunset-from-a-peaceful-beach-44496/"),
  },
  {
    id: "pc-106",
    slug: "bau-troi-sao-qua-tan-cay",
    title: "Bầu trời sao qua tán cây",
    shortDescription: "Những vì sao xoay chậm phía sau vòm lá.",
    description:
      "Nằm ngửa nhìn lên giữa khu rừng đêm, các vì sao xoay chậm phía sau vòm lá đen. Một thước phim tua nhanh, để thấy bầu trời vẫn luôn chuyển động kể cả khi ta ngủ.",
    ...media("bau-troi-sao-qua-tan-cay"),
    durationSeconds: 10,
    categoryId: "cat_reflection",
    moodIds: ["mood_quiet", "mood_inspired"],
    publishedAt: "2026-11-09T22:00:00+07:00",
    ...published,
    credit: mixkit("Starry Sky Framed by Trees", "https://mixkit.co/free-stock-video/starry-sky-framed-by-trees-100824/"),
  },
  {
    id: "pc-105",
    slug: "binh-minh-tren-rung-thong",
    title: "Bình minh trên rừng thông",
    shortDescription: "Mặt trời nhô lên sau rặng thông, thung lũng dần sáng.",
    description:
      "Từ đỉnh đồi phủ tuyết, mặt trời nhô lên sau rặng thông, những thung lũng phía xa dần hiện ra trong lớp sương xanh. Một ngày mới bắt đầu không cần ai đánh thức.",
    ...media("binh-minh-tren-rung-thong"),
    durationSeconds: 11,
    categoryId: "cat_moments",
    moodIds: ["mood_hope", "mood_inspired"],
    publishedAt: "2026-11-08T06:00:00+07:00",
    ...published,
    credit: mixkit("Bright sun rising over the skyline in the forest", "https://mixkit.co/free-stock-video/bright-sun-rising-over-the-skyline-in-the-forest-31607/"),
  },

  // Reachable by direct link only — never listed.
  {
    id: "pc-u01",
    slug: "noi-con-suoi-re-ngoat",
    title: "Nơi con suối rẽ ngoặt",
    shortDescription: "Một khúc quanh của dòng suối, nơi nước va vào đá và đổi hướng.",
    description:
      "Một khúc quanh nhỏ của dòng suối, nơi nước va vào đá rồi đổi hướng. Thước phim này chỉ dành cho những ai có đường dẫn.",
    ...media("noi-con-suoi-re-ngoat"),
    durationSeconds: 17,
    categoryId: "cat_moments",
    moodIds: ["mood_quiet"],
    publishedAt: "2026-10-20T10:00:00+07:00",
    status: "published",
    visibility: "unlisted",
    isFeatured: false,
    credit: credits.sixes,
  },

  // Must never appear on the public site.
  {
    id: "pc-d01",
    slug: "binh-minh-tren-bai-cat",
    title: "Bình minh trên bãi cát (bản nháp)",
    shortDescription: "Bản nháp chưa xuất bản.",
    description: "Bản nháp chưa xuất bản.",
    thumbnailUrl: asset("/images/postcards/binh-minh-tren-bai-cat.jpg"),
    durationSeconds: 60,
    categoryId: "cat_art",
    moodIds: ["mood_hope"],
    publishedAt: "2026-11-22T06:00:00+07:00",
    status: "draft",
    visibility: "public",
    isFeatured: true,
  },
  {
    id: "pc-p01",
    slug: "mot-buoi-sang-o-vinh",
    title: "Một buổi sáng ở vịnh (riêng tư)",
    shortDescription: "Thước phim riêng tư.",
    description: "Thước phim riêng tư.",
    thumbnailUrl: asset("/images/postcards/mot-buoi-sang-o-vinh.jpg"),
    durationSeconds: 60,
    categoryId: "cat_travel",
    moodIds: ["mood_relax"],
    publishedAt: "2026-11-21T08:00:00+07:00",
    status: "published",
    visibility: "private",
    isFeatured: false,
  },
];

/**
 * "Những điều nhỏ bé — The Little Postcard Project" podcast.
 *
 * Real content (not mock data): concept, 12-episode schedule and the
 * episode 01 narration, taken verbatim from the project's planning
 * conversation (sound / pacing cues and planned timecodes removed). Planning notes, production notes and anything addressed
 * to a specific listener are deliberately not published here.
 * Poster: generated with ChatGPT for this project.
 */
import { asset } from "@/lib/asset";

/** A part of the episode as read aloud — narration only, no production cues. */
export interface ScriptSection {
  label: string;
  paragraphs: string[];
}

export interface PodcastEpisode {
  number: number;
  slug: string;
  title: string;
  tagline?: string;
  /** ISO date, Vietnam time */
  airDate: string;
  durationLabel: string;
  /** "published" episodes have a page; "upcoming" are listed only. */
  status: "published" | "upcoming";
  theme?: string;
  keyMessage?: string;
  poster?: { src: string; alt: string; width: number; height: number };
  /** Mixed episode audio (voice + music bed), see scripts/mix-podcast.sh. */
  audio?: { src: string; durationSeconds: number };
  script?: ScriptSection[];
}

export const podcastSeries = {
  title: "Những điều nhỏ bé",
  englishTitle: "The Little Postcard Project",
  description:
    "Những tấm bưu thiếp bằng âm thanh. Mỗi tập mở ra một không gian nhỏ về thiên nhiên, âm nhạc, nghệ thuật, những chuyến đi chưa thực hiện và những điều đáng mong chờ trong tuần mới.",
  intro:
    "Một nơi để đi chậm lại, nghe một câu chuyện, ngắm nhìn thế giới qua một góc khác và nhặt nhạnh vài điều dễ thương trong cuộc sống. Không có bài học nào quá lớn lao — chỉ là những câu chuyện nhỏ, những giai điệu đẹp và đôi khi là một chuyến đi mà chúng ta chưa kịp thực hiện.",
  schedule: "Thứ Ba · Thứ Năm · Chủ Nhật",
  run: "12 tập · 24/11 – 20/12/2026",
  episodeLength: "5–7 phút mỗi tập",
} as const;

/** Splits a passage into paragraphs on blank lines. */
function passage(raw: string): string[] {
  return raw
    .trim()
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

const episode01Script: ScriptSection[] = [
  {
    label: "Mở đầu",
    paragraphs: passage(`

Chào em.

Chào mừng em đến với Những điều nhỏ bé.

Đây là nơi chúng ta dành ra một chút thời gian để đi chậm lại, nghe một câu chuyện, ngắm nhìn thế giới qua một góc khác và nhặt nhạnh vài điều dễ thương trong cuộc sống.

Không có bài học nào quá lớn lao ở đây cả.

Chỉ là những câu chuyện nhỏ, những giai điệu đẹp và đôi khi là một chuyến đi mà chúng ta chưa kịp thực hiện.

Và hôm nay, anh muốn kể em nghe một câu chuyện về nghệ thuật.

Một câu chuyện có tên là...

Nghệ thuật không nghĩ quá nhiều.

`),
  },
  {
    label: "Câu chuyện",
    paragraphs: passage(`
Ngày xửa ngày xưa, trong một con phố nhỏ có một người họa sĩ sống cùng một chú mèo lười và rất nhiều chậu cây xanh.

Căn nhà của anh không rộng lắm, nhưng có một ô cửa sổ rất đẹp. Mỗi buổi sáng, ánh nắng thường len qua rèm cửa, rơi xuống sàn nhà và chiếu lên chiếc giá vẽ đặt cạnh cửa sổ.

Người họa sĩ có một thói quen khá kỳ lạ.

Mỗi sáng, anh đều thức dậy, pha một tách cà phê, kéo ghế ngồi trước tấm canvas trắng và... suy nghĩ.

Anh suy nghĩ xem hôm nay nên vẽ gì.

Nếu vẽ phong cảnh, anh muốn bức tranh phải thật đẹp.

Nếu vẽ chân dung, anh muốn từng đường nét phải thật hoàn hảo.

Nếu vẽ một bông hoa, anh lại lo rằng màu sắc mình chọn không đủ tinh tế.

Thế là ngày này qua ngày khác, tấm canvas vẫn trắng tinh.

Có hôm anh ngồi trước nó ba tiếng đồng hồ mà chẳng vẽ nổi một nét.

Chú mèo nằm bên cạnh, thỉnh thoảng ngáp một cái rồi ngủ tiếp. Có lẽ nó cũng chẳng hiểu tại sao con người lại có thể dành cả buổi sáng chỉ để nhìn một tấm vải trắng.

Một ngày nọ, người bạn thân ghé thăm.

Thấy anh vẫn đang ngồi trầm ngâm trước giá vẽ, người bạn hỏi:

"Này, cậu định vẽ gì thế?"

Người họa sĩ trả lời:

"Tớ cũng chưa biết. Tớ đang nghĩ xem nên vẽ gì để thật đẹp."

Người bạn nhìn tấm canvas rồi nhìn anh, sau đó bật cười:

"Hay là cậu thử vẽ một thứ gì đó trước khi nghĩ xem nó có đẹp hay không?"

Người họa sĩ im lặng một lúc.

Câu nói ấy nghe có vẻ đơn giản đến mức buồn cười.

Nhưng sáng hôm sau, anh quyết định thử.

Anh cầm cọ, nhúng vào màu vàng và đặt một nét thật nhẹ lên tấm canvas.

Chỉ một vệt vàng.

Anh nhìn nó một lúc rồi mỉm cười.

Sau đó, anh vẽ thêm một chiếc lá xanh, một ô cửa sổ, vài đám mây và một chú chim đang đậu trên mái nhà đối diện.

Bức tranh chẳng có chủ đề gì đặc biệt.

Màu sắc cũng chẳng theo một quy tắc nào.

Nhưng lần đầu tiên sau rất lâu, anh cảm thấy vui khi ngồi trước giá vẽ.

Anh nhận ra mình đã dành quá nhiều thời gian để tưởng tượng về một bức tranh hoàn hảo đến mức quên mất niềm vui của việc vẽ.

Và có lẽ, điều thú vị nhất của nghệ thuật không nằm ở việc tạo ra một kiệt tác.

Đôi khi, nó chỉ đơn giản là được tự do tạo ra một thứ gì đó bằng chính cảm xúc của mình.

`),
  },
  {
    label: "Suy ngẫm",
    paragraphs: passage(`
Anh nghĩ cuộc sống của chúng ta đôi khi cũng giống như tấm canvas của người họa sĩ ấy.

Có những ngày mình suy nghĩ quá nhiều về những điều chưa xảy ra.

Tự hỏi liệu mình đã làm đúng chưa, liệu lựa chọn hôm nay có tốt không, liệu tương lai sẽ đi về đâu.

Có những lúc mình nhìn cuộc sống của người khác rồi vô thức đem bản thân ra so sánh.

Thấy ai đó đang tiến về phía trước thật nhanh, mình lại tự hỏi tại sao bản thân vẫn còn ở đây.

Rồi mình cố gắng lên kế hoạch cho mọi thứ, muốn mọi chuyện phải diễn ra đúng như những gì đã hình dung.

Nhưng cuộc sống đâu phải lúc nào cũng vận hành theo một bản phác thảo.

Có những điều đẹp đẽ chỉ xuất hiện khi mình không cố gắng sắp xếp chúng.

Như một buổi chiều tình cờ gặp được một quán cà phê dễ thương.

Một bản nhạc cũ bất chợt vang lên đúng lúc mình cần nghe.

Một chuyến xe đi qua con đường có hàng cây đang thay lá.

Hay đơn giản là một ngày thức dậy, thấy trời rất xanh và tự nhiên cảm thấy hôm nay thật đáng yêu.

Anh nghĩ mình không nhất thiết phải biến mỗi ngày thành một hành trình chinh phục điều gì đó.

Không phải ngày nào cũng cần có thành tựu đáng kể.

Đôi khi, mình chỉ cần cho phép bản thân tận hưởng một vài điều nhỏ bé.

Nghe một bản nhạc mình thích.

Ngắm một bông hoa đang nở.

Mua một bó hoa nhỏ về đặt cạnh cửa sổ.

Hoặc dành buổi tối để chẳng cần giải quyết thêm điều gì.

Bởi vì cuộc sống không chỉ được tạo nên từ những cột mốc lớn lao.

Nó còn được tạo nên từ hàng nghìn khoảnh khắc nhỏ mà đôi khi mình vô tình đi qua quá nhanh.

Và có lẽ, chúng ta cũng nên học cách đối xử với cuộc sống giống như người họa sĩ kia.

Đừng đợi đến khi có một ý tưởng thật hoàn hảo mới bắt đầu.

Đừng đợi đến khi mọi thứ thật ổn mới cho phép mình vui.

Cứ thử một chút, trải nghiệm một chút, đôi khi làm những điều chẳng có mục đích gì đặc biệt.

Biết đâu, chính những điều tưởng chừng ngẫu nhiên ấy lại tạo nên một bức tranh rất đẹp.
`),
  },
  {
    label: "Lời kết",
    paragraphs: passage(`

À, và nếu hôm nay em vẫn còn vài điều chưa giải quyết xong, cũng chẳng sao đâu.

Ngày mai mặt trời vẫn sẽ mọc, những chiếc lá vẫn tiếp tục xanh, và thế giới vẫn còn rất nhiều điều thú vị đang chờ mình khám phá.

Đừng vội biến mỗi ngày thành một bài kiểm tra xem mình đã sống tốt đến đâu.

Thỉnh thoảng, hãy cứ sống như một người đang vẽ tranh.

Chọn một màu mình thích, vẽ một nét mình muốn và tận hưởng khoảng thời gian mình đang có.

Anh hy vọng em sẽ tìm thấy niềm vui trong những điều thật bình thường.

Và nếu có thể, hãy dành cho mình một chút thời gian để làm điều gì đó chỉ vì em thích.

Không cần lý do.

Không cần phải thật giỏi.

Cũng không cần ai công nhận.

Chỉ cần em thấy vui là được.


Cảm ơn em đã dành thời gian lắng nghe câu chuyện hôm nay.

Hẹn gặp lại em trong tấm bưu thiếp tiếp theo, vào thứ Năm nhé.

Chúc em có một buổi tối thật dịu dàng.

`),
  },
];

const upcoming = (
  number: number,
  slug: string,
  title: string,
  airDate: string,
  tagline?: string,
): PodcastEpisode => ({ number, slug, title, airDate, tagline, durationLabel: "5–7 phút", status: "upcoming" });

export const podcastEpisodes: PodcastEpisode[] = [
  {
    number: 1,
    slug: "tap-01-nghe-thuat-khong-nghi-qua-nhieu",
    title: "Nghệ thuật không nghĩ quá nhiều",
    tagline:
      "Một câu chuyện nhỏ về việc cho phép bản thân được bắt đầu, được trải nghiệm và tận hưởng cuộc sống tự nhiên hơn.",
    airDate: "2026-11-24",
    durationLabel: "7 phút 28 giây",
    status: "published",
    theme: "Nghệ thuật, cảm xúc và cách tận hưởng những điều bình thường trong cuộc sống.",
    keyMessage: "Đừng đợi đến khi mọi thứ hoàn hảo mới bắt đầu tận hưởng cuộc sống.",
    poster: {
      src: asset("/images/podcast/tap-01-nghe-thuat-khong-nghi-qua-nhieu.jpg"),
      alt: "Poster tập 01: xưởng vẽ buổi sáng ngập nắng, giá vẽ, tách cà phê và tấm bưu thiếp — Nghệ thuật không nghĩ quá nhiều",
      width: 1086,
      height: 1448,
    },
    audio: {
      src: asset("/audio/podcast/tap-01-nghe-thuat-khong-nghi-qua-nhieu.mp3"),
      durationSeconds: 448,
    },
    script: episode01Script,
  },
  upcoming(2, "tap-02", "Cuộc trò chuyện giữa Mặt Trời và Mặt Trăng", "2026-11-26"),
  upcoming(3, "tap-03", "Một ngày chẳng cần làm gì lớn lao", "2026-11-29"),
  upcoming(4, "tap-04", "Những chiếc mặt nạ trưởng thành", "2026-12-01"),
  upcoming(5, "tap-05", "Tiệm bán những ngày vui", "2026-12-03", "Một câu chuyện tưởng tượng có chút hài hước"),
  upcoming(6, "tap-06", "Thành phố lúc 7 giờ sáng", "2026-12-06", "Vẻ đẹp của những khởi đầu bình thường"),
  upcoming(7, "tap-07", "Khoảng cách và sự thấu hiểu", "2026-12-08", "Gần gũi không đồng nghĩa với kiểm soát"),
  upcoming(8, "tap-08", "Nếu cảm xúc có màu sắc", "2026-12-10", "Một câu chuyện sáng tạo về thế giới nội tâm"),
  upcoming(9, "tap-09", "Những nơi ta chưa từng đến", "2026-12-13", "Sự tò mò khiến cuộc sống luôn mới"),
  upcoming(10, "tap-10", "Học cách không so sánh", "2026-12-15", "Mỗi người có một nhịp trưởng thành riêng"),
  upcoming(11, "tap-11", "Cuộc đời của một chiếc lá", "2026-12-17", "Một góc nhìn khác về thay đổi"),
  upcoming(12, "tap-12", "Những điều muốn giữ lại", "2026-12-20", "Nhìn lại những khoảnh khắc đẹp trong tuần"),
];

export const publishedEpisodes = podcastEpisodes.filter((e) => e.status === "published");

export function getEpisode(slug: string): PodcastEpisode | undefined {
  return publishedEpisodes.find((e) => e.slug === slug);
}

/** Four weeks of three episodes, as planned. */
export function episodesByWeek(): { week: number; range: string; episodes: PodcastEpisode[] }[] {
  const ranges = ["24/11 – 29/11", "01/12 – 06/12", "08/12 – 13/12", "15/12 – 20/12"];
  return ranges.map((range, i) => ({
    week: i + 1,
    range,
    episodes: podcastEpisodes.slice(i * 3, i * 3 + 3),
  }));
}

const WEEKDAYS = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];

/** "2026-11-24" → "Thứ Ba, 24/11/2026" */
export function formatAirDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const weekday = WEEKDAYS[new Date(Date.UTC(y, m - 1, d)).getUTCDay()];
  return `${weekday}, ${String(d).padStart(2, "0")}/${String(m).padStart(2, "0")}/${y}`;
}

/** "2026-11-24" → "T3 · 24/11" */
export function formatAirDateShort(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const day = new Date(Date.UTC(y, m - 1, d)).getUTCDay();
  return `${day === 0 ? "CN" : `T${day + 1}`} · ${String(d).padStart(2, "0")}/${String(m).padStart(2, "0")}`;
}

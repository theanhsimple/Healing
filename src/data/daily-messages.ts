/**
 * "Thông điệp hôm nay" — one short message per day, in the voice of
 * the podcast. Entries with `from` are verbatim lines from that episode's
 * narration (checked); the rest are drafts in the same spirit — some
 * adapted from the episode, addressed to "bạn" — to be edited freely.
 *
 * The message for a date is fixed (same for every visitor that day) and
 * cycles through the list. Add, remove or reorder freely.
 */
export interface DailyMessage {
  text: string;
  /** Where a quoted line comes from. */
  from?: string;
}

const EP01 = "Tập 01 · Nghệ thuật không nghĩ quá nhiều";

export const dailyMessages: DailyMessage[] = [
  { text: "Đừng đợi đến khi mọi thứ hoàn hảo mới bắt đầu tận hưởng cuộc sống.", from: EP01 },
  { text: "Không phải ngày nào cũng cần có thành tựu đáng kể.", from: EP01 },
  { text: "Hôm nay, hãy cho mình một khoảng nghỉ — dù chỉ là mười phút ngồi yên bên cửa sổ." },
  { text: "Đừng vội biến mỗi ngày thành một bài kiểm tra xem mình đã sống tốt đến đâu.", from: EP01 },
  { text: "Bạn không cần phải đi nhanh. Bạn chỉ cần tiếp tục đi." },
  { text: "Một tách trà ấm, một bản nhạc quen — đôi khi thế là đủ cho một buổi tối." },
  { text: "Có những điều đẹp đẽ chỉ xuất hiện khi mình không cố gắng sắp xếp chúng.", from: EP01 },
  { text: "Hãy nhìn lên bầu trời một lần trong hôm nay. Nó vẫn đang đổi màu cho bạn." },
  { text: "Mỗi người có một nhịp trưởng thành riêng. Nhịp của bạn cũng vậy." },
  { text: "Không cần lý do. Không cần phải thật giỏi. Chỉ cần mình thấy vui là được." },
  { text: "Điều nhỏ bé bạn làm hôm nay vẫn là một điều đáng kể." },
  { text: "Nếu hôm nay mệt, hãy nghỉ. Ngày mai mặt trời vẫn sẽ mọc." },
  { text: "Hãy làm một việc chỉ vì bạn thích, không vì ai cần." },
  { text: "Cuộc sống được tạo nên từ hàng nghìn khoảnh khắc nhỏ — hôm nay cũng có một vài khoảnh khắc như thế." },
  { text: "Bạn không cần trả lời mọi câu hỏi trong hôm nay." },
  { text: "Thử đi một con đường khác trên đường về. Biết đâu có một hàng cây đang thay lá." },
  { text: "Hãy dịu dàng với chính mình như cách bạn dịu dàng với người bạn thương." },
  { text: "Cứ thử một chút, trải nghiệm một chút. Không phải điều gì cũng cần một kế hoạch." },
  { text: "Một tin nhắn hỏi thăm ai đó hôm nay có thể làm ấm cả ngày của họ." },
  { text: "Thế giới ngoài kia vẫn đang đẹp theo cách lặng lẽ của nó." },
  { text: "Bạn đã đi được một quãng xa hơn mình nghĩ." },
  { text: "Chọn một màu mình thích, vẽ một nét mình muốn — và tận hưởng khoảng thời gian mình đang có." },
  { text: "Hôm nay không cần so sánh. Chỉ cần nhìn lại hôm qua của chính mình." },
  { text: "Hít một hơi thật sâu. Thả lỏng vai. Bạn đang ổn." },
  { text: "Có những ngày chỉ cần thấy dễ chịu hơn một chút, thế đã là một ngày đáng quý rồi." },
  { text: "Hãy để dành cho mình một điều để mong chờ vào cuối tuần." },
  { text: "Những chuyến đi chưa thực hiện vẫn đang chờ bạn. Không sao nếu chưa phải lúc này." },
  { text: "Mua một bó hoa nhỏ về đặt cạnh cửa sổ — không cần dịp gì cả." },
  { text: "Lắng nghe nhiều hơn một chút hôm nay: tiếng gió, tiếng mưa, và cả chính mình." },
  { text: "Điều bạn đang lo hôm nay, có lẽ một năm sau sẽ chỉ còn là một câu chuyện nhỏ." },
  { text: "Chúc bạn có một buổi tối thật dịu dàng." },
];

const DAY_MS = 86_400_000;
const VN_OFFSET_MS = 7 * 3_600_000;

/** Calendar date in Vietnam (UTC+7, no DST) as "YYYY-MM-DD". */
export function vietnamDateKey(now: number = Date.now()): string {
  return new Date(now + VN_OFFSET_MS).toISOString().slice(0, 10);
}

/** The message for a Vietnam calendar date — same for every visitor that day. */
export function messageForDate(dateKey: string): DailyMessage {
  const day = Math.floor(Date.parse(`${dateKey}T00:00:00Z`) / DAY_MS);
  return dailyMessages[((day % dailyMessages.length) + dailyMessages.length) % dailyMessages.length];
}

/** "2026-11-24" → "Thứ Ba, 24 tháng 11" */
export function formatMessageDate(dateKey: string): string {
  const [y, m, d] = dateKey.split("-").map(Number);
  const weekday = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"][
    new Date(Date.UTC(y, m - 1, d)).getUTCDay()
  ];
  return `${weekday}, ${d} tháng ${m}`;
}

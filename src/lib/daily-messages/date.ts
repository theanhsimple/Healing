const VN_OFFSET_MS = 7 * 3_600_000;

/** Calendar date in Vietnam (UTC+7, no DST) as "YYYY-MM-DD". */
export function vietnamDateKey(now: number = Date.now()): string {
  return new Date(now + VN_OFFSET_MS).toISOString().slice(0, 10);
}

/** "2026-11-24" → "Thứ Ba, 24 tháng 11" */
export function formatMessageDate(dateKey: string): string {
  const [y, m, d] = dateKey.split("-").map(Number);
  const weekday = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"][
    new Date(Date.UTC(y, m - 1, d)).getUTCDay()
  ];
  return `${weekday}, ${d} tháng ${m}`;
}

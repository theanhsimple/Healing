/**
 * "Thông điệp hôm nay" — one short prose postcard per day: a small title
 * and two or three sentences, in the voice of the podcast. Seasonless on
 * purpose, since the list cycles all year. Original writing (drafts) —
 * edit, add or reorder freely.
 *
 * The message for a date is the same for every visitor that day.
 */
export interface DailyMessage {
  title: string;
  text: string;
}

export const dailyMessages: DailyMessage[] = [
  {
    title: "Lời chào của nắng",
    text: "Có những buổi sáng, ánh nắng đến rất khẽ, đậu lên mép bàn như một lời chào không cần hồi đáp. Hôm nay, bạn không cần vội trả lời thế giới. Cứ để mình chậm thêm một chút — những điều tốt đẹp vẫn biết đường tìm đến.",
  },
  {
    title: "Một ngày đủ đẹp",
    text: "Người ta thường nghĩ một ngày đáng giá phải có điều gì lớn lao. Nhưng có những ngày chỉ cần một tách trà còn ấm, một bản nhạc cũ vang lên đúng lúc, và một khoảnh khắc lòng mình chợt nhẹ. Như thế đã đủ để gọi là một ngày đẹp.",
  },
  {
    title: "Nét cọ đầu tiên",
    text: "Tấm canvas trắng không đợi một ý tưởng hoàn hảo; nó chỉ đợi nét cọ đầu tiên. Nếu có điều gì bạn vẫn để dành “cho đến khi sẵn sàng”, hôm nay hãy thử chấm một vệt màu thật nhỏ. Phần còn lại, rồi sẽ tự thành hình.",
  },
  {
    title: "Khi mặt hồ lặng",
    text: "Mặt hồ chỉ soi rõ bầu trời khi gió đã lặng. Lòng người cũng vậy — có những câu trả lời chỉ hiện ra khi ta thôi cố gắng đi tìm. Hôm nay, hãy cho phép mình được yên một lúc.",
  },
  {
    title: "Mùa hoa của riêng mình",
    text: "Bạn không cần phải đi nhanh như ai cả. Mỗi cái cây có mùa ra hoa của riêng nó, và chưa từng cây nào vội vàng chỉ vì nhìn sang khu vườn bên cạnh. Nhịp của bạn, tự nó đã là một nhịp đẹp.",
  },
  {
    title: "Những tấm bưu thiếp để ngỏ",
    text: "Có những lời chưa kịp nói, những chuyến đi chưa kịp đi, những người chưa kịp gặp lại. Đừng xem chúng là nỗi tiếc — hãy xem như những tấm bưu thiếp còn để ngỏ, chờ một ngày thích hợp để được gửi đi.",
  },
  {
    title: "Bầu trời vẫn đang vẽ",
    text: "Hôm nay, thử ngẩng lên nhìn trời một lần thôi. Mây vẫn đang đổi hình, ánh sáng vẫn đang đổi màu, như thể thế giới vẫn kiên nhẫn vẽ cho ai đó chịu dừng lại để ngắm. Biết đâu người ấy là bạn.",
  },
  {
    title: "Mưa không vội",
    text: "Mưa chẳng bao giờ vội. Mưa rơi từng giọt, chậm rãi thấm vào đất, rồi một sáng nào đó cây nhú chồi mà chẳng ai kịp hay. Những cố gắng âm thầm của bạn cũng thế — chưa thấy, không có nghĩa là chưa có.",
  },
  {
    title: "Ngồi xuống bên đường",
    text: "Có một kiểu can đảm rất nhỏ: dám nghỉ ngơi khi mệt. Không phải bỏ cuộc, chỉ là ngồi xuống bên đường một chút, uống ngụm nước, nhìn lại quãng đã qua. Con đường vẫn ở đó, và bạn sẽ bước tiếp nhẹ nhàng hơn.",
  },
  {
    title: "Những ngày bình thường",
    text: "Đừng biến mỗi ngày thành một bài kiểm tra xem mình đã sống tốt đến đâu. Có những ngày chỉ cần đi qua cho trọn vẹn, ăn một bữa ngon, ngủ một giấc sâu. Cuộc đời không chấm điểm những ngày bình thường — nó chỉ lặng lẽ nhớ chúng thật dịu dàng.",
  },
  {
    title: "Niềm vui không cần lý do",
    text: "Hãy làm một điều chỉ vì bạn thích: vẽ nguệch ngoạc, hát sai lời, đi bộ một quãng không có đích đến. Không cần ai công nhận, không cần phải giỏi. Niềm vui chẳng đòi hỏi lý do — nó chỉ cần được mời vào.",
  },
  {
    title: "Đá và sỏi",
    text: "Có những nỗi lo hôm nay nặng như đá, nhưng thời gian là dòng nước rất kiên nhẫn. Một năm sau nhìn lại, có lẽ chúng chỉ còn là những viên sỏi nhỏ, nằm yên dưới đáy một câu chuyện bạn kể lại bằng nụ cười.",
  },
  {
    title: "Ngọn đèn nhỏ",
    text: "Một tin nhắn hỏi thăm, một lời cảm ơn muộn, một câu “dạo này cậu ổn không?” — những điều nhỏ đến mức tưởng chẳng đáng kể. Vậy mà có khi, chúng là ngọn đèn ai đó cần để đi qua một buổi tối dài.",
  },
  {
    title: "Lời dịu dàng",
    text: "Hãy nói với chính mình những lời bạn vẫn dành cho một người bạn đang mỏi mệt. Không trách móc, không thúc giục — chỉ một câu thật khẽ: “Không sao đâu. Cậu đã cố gắng nhiều rồi.”",
  },
  {
    title: "Khúc rẽ chưa đi",
    text: "Thử về nhà bằng một con đường khác hôm nay. Có thể bạn sẽ gặp một hàng cây đang thay lá, một quán nhỏ thơm mùi bánh, một ô cửa sổ treo đầy hoa. Thế giới thường giấu những điều dễ thương ở ngay khúc rẽ ta chưa từng đi.",
  },
  {
    title: "Có mặt",
    text: "Hít một hơi thật sâu, rồi thở ra thật chậm. Thả lỏng đôi vai đã gồng lên từ sáng. Ngay lúc này, ở đây, bạn không cần giải quyết điều gì cả — chỉ cần có mặt, trọn vẹn, với chính mình.",
  },
  {
    title: "Lá rời cành",
    text: "Những chiếc lá không buồn khi rời cành. Chúng xoay một vòng trong gió, đáp xuống đất, rồi trở thành phần đất nuôi những mầm xanh mới. Có những kết thúc, hoá ra, chỉ là một cách khác để bắt đầu.",
  },
  {
    title: "Bắt đầu lại",
    text: "Nếu hôm nay bạn chưa làm được gì nhiều, cũng chẳng sao đâu. Ngày mai mặt trời vẫn mọc, lá vẫn xanh, và thế giới vẫn còn bao điều thú vị đang đợi. Bạn còn rất nhiều buổi sáng để bắt đầu lại.",
  },
  {
    title: "Một điều để mong chờ",
    text: "Hãy để dành cho mình một điều nho nhỏ để mong chờ: một cuốn sách chưa mở, một buổi cà phê cuối tuần, một bộ phim đã lưu từ lâu. Niềm mong chờ là thứ ánh sáng khiến những ngày thường bớt dài.",
  },
  {
    title: "Mở hé cửa sổ",
    text: "Có những ngày lòng mình như căn phòng chưa dọn — bừa bộn, ngổn ngang. Không cần sắp xếp tất cả trong một lần. Chỉ cần mở hé cửa sổ cho gió vào, rồi từ từ, mọi thứ sẽ tìm lại chỗ của nó.",
  },
  {
    title: "Dấu chân trên cát",
    text: "Bạn đã đi một quãng xa hơn mình nghĩ. Nếu quay lại nhìn, bạn sẽ thấy những ngày tưởng không vượt qua nổi giờ chỉ còn là những dấu chân mờ trên cát. Hãy tự hào một chút về người đã bước qua tất cả những ngày ấy.",
  },
  {
    title: "Lắng nghe",
    text: "Hôm nay, lắng nghe nhiều hơn một chút: tiếng gió lùa qua tán lá, tiếng mưa gõ nhẹ mái hiên, tiếng nước reo trong ấm. Giữa những âm thanh rất khẽ ấy, có khi bạn sẽ nghe thấy cả tiếng lòng mình.",
  },
  {
    title: "Nở theo cách của mình",
    text: "Chẳng bông hoa nào đợi được khen mới nở. Nó nở vì đã đến lúc, vì nắng vừa đủ ấm, vì đất vừa đủ ẩm. Bạn cũng vậy — bạn xứng đáng được nở rộ theo cách của mình, dù có ai nhìn thấy hay không.",
  },
  {
    title: "Một bó hoa nhỏ",
    text: "Mua một bó hoa nhỏ về đặt cạnh cửa sổ, chẳng cần dịp gì cả. Đôi khi, ta chỉ cần một chút màu sắc để nhớ rằng cuộc sống không chỉ có những việc phải làm, mà còn có những điều để ngắm nhìn.",
  },
  {
    title: "Hôm qua của chính mình",
    text: "Hôm nay không cần so sánh mình với bất kỳ ai. Người duy nhất đáng để bạn nhìn lại là chính bạn của ngày hôm qua — và nếu hôm nay bạn chỉ nhẹ lòng hơn một chút, thế đã là một bước tiến rất đẹp.",
  },
  {
    title: "Những khoảnh khắc không lặp lại",
    text: "Có những khoảnh khắc chẳng bao giờ lặp lại: ráng chiều trên mặt sông, tiếng cười của ai đó bên mâm cơm tối, mùi cà phê lúc sớm mai. Hãy sống chậm vừa đủ để kịp giữ chúng lại trong tim.",
  },
  {
    title: "Cho phép mình chưa biết",
    text: "Không phải câu hỏi nào cũng cần lời đáp ngay. Có những điều cần thời gian để chín, như trái trên cành, như một mối quan hệ, như một quyết định lớn. Hôm nay, hãy cho phép mình được chưa biết.",
  },
  {
    title: "Phía sau những đám mây",
    text: "Bầu trời không vì một ngày nhiều mây mà thôi là bầu trời. Nỗi buồn của bạn cũng chỉ là mây — nó đến rồi đi, còn bạn vẫn rộng lớn và trong xanh như thế, ở phía sau tất cả.",
  },
  {
    title: "Hành lý của ước mơ",
    text: "Những chuyến đi chưa thực hiện vẫn đang chờ bạn ở đâu đó: một bãi biển vắng, một thị trấn sương mù, một con đèo quanh co. Không sao nếu chưa phải lúc này. Ước mơ cũng như hành lý — cứ xếp sẵn, rồi sẽ có ngày lên đường.",
  },
  {
    title: "Trang sách khép lại",
    text: "Đôi khi, điều tử tế nhất bạn có thể làm cho mình là đi ngủ sớm. Để ngày hôm nay khép lại như một trang sách đã đọc xong, và tin rằng sáng mai sẽ là một trang mới, trắng tinh và đầy ánh sáng.",
  },
  {
    title: "Buổi tối dịu dàng",
    text: "Chúc bạn một buổi tối thật êm — với ánh đèn vàng, với tiếng nhạc khẽ, với một người để nhắn câu “ngủ ngon”. Và nếu tối nay chỉ có mình bạn, hãy là người bạn hiền nhất của chính mình.",
  },
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

/**
 * The person behind Little Postcard.
 *
 * `title` and `bio` are taken verbatim from Rabbit's reader profile on
 * rabbittarot.io.vn. `here` is new copy for this site (a draft to edit).
 * Contact details (Zalo phone / QR) are intentionally not repeated here.
 */
import { asset } from "@/lib/asset";

export const author = {
  name: "Rabbit",
  role: "Reader tại Rabbit Tarot",
  card: "Justice",
  title: "Thấu hiểu bản thân, cân bằng lựa chọn, truyền cảm hứng sống.",
  bio: "Mang năng lượng của lá bài Justice, Rabbit đại diện cho sự công tâm, thấu hiểu và khả năng nhìn nhận mọi vấn đề từ nhiều góc độ. Với mong muốn trở thành người truyền cảm hứng, Rabbit tin rằng mỗi trải nghiệm đều mang đến một bài học, mỗi lựa chọn đều mở ra một hướng đi mới. Thông qua Tarot, Rabbit mong muốn giúp mọi người hiểu rõ bản thân, tìm thấy sự cân bằng và tự tin hơn trên hành trình của chính mình.",
  here: "Little Postcard là góc nhỏ Rabbit dành cho những câu chuyện chậm rãi — nơi gửi đi những tấm bưu thiếp bằng âm thanh và hình ảnh, để ai ghé qua cũng có thể dừng lại một chút.",
  photo: {
    src: asset("/images/about/rabbit.jpg"),
    alt: "Rabbit trong bộ vest nhung đỏ thêu chòm sao, đang xào bài Tarot bên bàn trải khăn đỏ",
    width: 720,
    height: 960,
  },
  link: { href: "https://rabbittarot.io.vn/#readers", label: "Rabbit Tarot" },
} as const;

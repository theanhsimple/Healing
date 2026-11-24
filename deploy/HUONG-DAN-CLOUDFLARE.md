# Đưa Healing lên rabbittarot.io.vn/healing qua Cloudflare

Chỉ làm **một lần**, khoảng 15 phút. Sau đó hai repo cập nhật độc lập.

```
Người xem ─▶ Cloudflare ─┬─ /healing/...  ─▶ Worker ─▶ repo Healing (gh-pages/rt)
                         └─ mọi thứ khác ─────────────▶ repo rabbit-tarot (như hiện nay)
```

---

## Bước 1. Tạo tài khoản và thêm tên miền

1. Vào **dash.cloudflare.com** → đăng ký (miễn phí).
2. Bấm **Add a domain** → nhập `rabbittarot.io.vn` → chọn **Quick scan for DNS records**.
3. Chọn gói **Free**.

## Bước 2. Đối chiếu bản ghi DNS (quan trọng — giữ email)

Cloudflare tự chép bản ghi sang. Mở tab **DNS → Records**, đảm bảo có **đủ** các dòng sau.
Cột **Proxy**: ☁️ cam = *Proxied*, ☁️ xám = *DNS only*.

| Type  | Name   | Content                    | Proxy        |
|-------|--------|----------------------------|--------------|
| A     | `@`    | `185.199.108.153`          | ☁️ **cam**   |
| A     | `@`    | `185.199.109.153`          | ☁️ **cam**   |
| A     | `@`    | `185.199.110.153`          | ☁️ **cam**   |
| A     | `@`    | `185.199.111.153`          | ☁️ **cam**   |
| CNAME | `www`  | `theanhsimple.github.io`   | ☁️ **cam**   |
| A     | `mail` | `112.213.89.150`           | ☁️ **xám**   |
| A     | `*`    | `112.213.89.150`           | ☁️ **xám**   |
| MX    | `@`    | `mail.rabbittarot.io.vn` (priority 10) | — |
| TXT   | `@`    | `v=spf1 a mx ~all`         | —            |

- Thiếu dòng nào thì bấm **Add record** để thêm.
- Bản ghi `mail` **bắt buộc xám**, nếu cam thì email sẽ không nhận được.
- Nếu trong trang quản lý DNS của P.A Việt Nam còn dòng nào khác
  (ví dụ TXT chứa `DKIM`, `google-site-verification`…), chép thêm sang y hệt.

## Bước 3. Đổi nameserver ở P.A Việt Nam

1. Cloudflare sẽ hiện **2 nameserver**, dạng `xxx.ns.cloudflare.com` và `yyy.ns.cloudflare.com`.
2. Đăng nhập **pavietnam.vn** → Quản lý tên miền → `rabbittarot.io.vn`
   → **Cập nhật DNS / Nameserver** → xoá 3 dòng `dnssec…pavietnam…`, nhập 2 nameserver của Cloudflare → Lưu.
3. Chờ Cloudflare báo **Active** (thường 15 phút – vài giờ; Cloudflare sẽ gửi email).
   Trong lúc chờ, web và email vẫn chạy bình thường.

## Bước 4. Cài SSL

**SSL/TLS → Overview** → chọn **Full**.
(Không chọn *Flexible* — sẽ gây lỗi chuyển hướng vòng lặp.)

## Bước 5. Tạo Worker

1. Menu trái **Workers & Pages** → **Create** → **Create Worker** (mẫu *Hello World*).
2. Đặt tên `healing` → **Deploy**.
3. Bấm **Edit code** → xoá hết code mẫu → dán toàn bộ nội dung file
   [`cloudflare-worker.js`](./cloudflare-worker.js) → **Deploy**.
4. Quay lại Worker → **Settings → Domains & Routes → Add → Route**:
   - Zone: `rabbittarot.io.vn`
   - Route: `rabbittarot.io.vn/healing*`
   - Bấm **Add route**.

## Bước 6. Kiểm tra

Mở **https://rabbittarot.io.vn/healing** — thấy trang Little Postcard là xong.
Báo lại cho Claude để kiểm tra lần cuối và thêm mục **Healing** vào menu Rabbit Tarot.

---

### Ghi chú

- Cập nhật Healing: chỉ cần đẩy bản build mới lên nhánh `gh-pages` của repo Healing
  (`npm run build:pages`). Không cần đụng Cloudflare hay rabbit-tarot.
- Cập nhật Rabbit Tarot: làm như hiện nay, không ảnh hưởng `/healing`.
- Gói Free của Worker cho 100.000 lượt truy cập/ngày.

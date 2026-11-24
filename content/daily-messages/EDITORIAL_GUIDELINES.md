# LITTLE POSTCARD
## Editorial Guidelines

**Project:** The Little Postcard Project  
**Library:** Master Message Library  
**Language:** Vietnamese  
**Version:** 1.0.0

## 1. Editorial purpose
Little Postcard gửi đến người đọc một mẩu suy nghĩ, câu chuyện, quan sát hoặc lời mời trải nghiệm mỗi ngày. Nội dung cần có giá trị độc lập, không mặc định người đọc đang buồn hoặc cần được chữa lành.

## 2. Voice and tone
- Tự nhiên, gần gũi, có chiều sâu nhưng không lên lớp.
- Viết như một người quan sát tinh tế đang chia sẻ điều mình nhận ra.
- Ưu tiên chi tiết cụ thể, hình ảnh đời thường và góc nhìn mới.
- Không cố tạo câu triết lý ở cuối mọi bài.
- Không lạm dụng từ ngữ trừu tượng hoặc văn phong quá hoa mỹ.

## 3. Avoid
Tránh lặp lại các mô-típ và cụm từ sáo mòn như “mọi chuyện rồi sẽ ổn”, “hãy yêu bản thân”, “phiên bản tốt nhất”, “vũ trụ gửi tín hiệu”, “mọi thứ xảy ra đều có lý do”. Không biến mọi chủ đề thành bài học chữa lành. Không dùng giọng khuyên răn hoặc khẳng định cảm xúc thay người đọc.

## 4. Content variety
Luân phiên các nhóm chủ đề: A Quiet Mind, The Art of Living, Nature Notes, The World of Art, Little Journeys, Human Stories, Time & Memory, Music & Sound, Creative Life, Small Joys, Relationships & Connections, Change & New Beginnings, Science & Curiosity, Philosophy & Perspective, Tomorrow & Possibility.

Không để hai ngày liên tiếp có cùng category nếu có thể. Theo dõi ý tưởng cốt lõi, không chỉ theo dõi tiêu đề để tránh trùng lặp ngữ nghĩa.

## 5. Daily message structure
Mỗi bản ghi gồm:
- message_id: định danh duy nhất, định dạng LP-DM-YYYYMMDD.
- publish_date: ngày xuất bản theo ISO 8601.
- content_type: daily_message, special_day hoặc episode_message.
- category: nhóm chủ đề.
- title: tiêu đề ngắn, tự nhiên.
- message: nội dung chính, thường 40–90 từ.
- closing_line: câu kết tùy chọn, không bắt buộc phải có.
- mood: sắc thái cảm xúc.
- visual_direction: gợi ý hình ảnh minh họa.
- related_episode_id: ID tập liên quan, để null nếu không có.
- special_day: tên dịp đặc biệt, để null nếu không có.
- editorial_note: lưu ý biên tập.
- status: draft, approved hoặc published.

## 6. Episode messages
Chỉ gắn related_episode_id khi đã có thông tin tập phát hành. Thông điệp ngày phát hành cần liên quan đến chủ đề tập nhưng vẫn có giá trị nếu người đọc chưa nghe tập. Không tự suy đoán lịch phát hành hoặc tên tập.

## 7. Special days and factual accuracy
Ngày lễ cần được kiểm tra ngày tháng theo lịch chính thức, đặc biệt với ngày âm lịch và các dịp thay đổi theo từng năm. Với nội dung khoa học, lịch sử hoặc văn hóa, cần kiểm chứng thông tin trước khi xuất bản. Không trình bày thông tin chưa xác minh như sự thật.

## 8. Quality checklist
Trước khi duyệt:
1. Ý tưởng có cụ thể và rõ không?
2. Có trùng ý với nội dung đã đăng không?
3. Có tự nhiên khi đọc thành tiếng không?
4. Có đang dạy đời hoặc áp đặt cảm xúc không?
5. Có chi tiết riêng khiến bài này đáng nhớ không?
6. Visual direction có thực sự hỗ trợ nội dung không?
7. Thông tin thực tế đã được kiểm chứng chưa?

## 9. CMS usage
JSON là nguồn dữ liệu chính. CMS có thể lọc theo publish_date, category, content_type, mood và status. Không hiển thị các trường editorial_note hoặc status cho người đọc cuối. Chỉ xuất bản bản ghi có status = approved hoặc published.

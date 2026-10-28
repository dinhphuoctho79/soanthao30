# Soạn thảo văn bản NĐ30

Tác giả: Nguyễn Công Dinh, Cần Thơ.
Hỗ trợ kỹ thuật và cấp key: Zalo 0386435510.
Dùng thử: 30 ngày miễn phí từ lần mở đầu tiên.

Repo này chứa 2 bản Electron cho Windows, cùng dùng bộ kiểm tra
thể thức NĐ30 và bộ xuất Word .docx thuần client-side:

- `cap-xa/` — Bản cấp xã theo mô hình chính quyền 2 cấp 2026
  (tỉnh và xã), 3 hồ sơ UBND xã, HĐND xã, Văn phòng HĐND và
  UBND xã, Wizard 5 bước, trình soạn bảng dạng lưới.
- `tram-y-te-hiep-hung/` — Bản Trạm Y tế Xã Hiệp Hưng, Cần Thơ,
  hồ sơ TYT, Trạm trưởng, kèm panel phân tích và tư vấn bằng
  Gemini. Key Gemini của đơn vị phải tự nhập trong app, không
  có key nào được đưa vào repo này.

## Build trên Windows

Mỗi thư mục là một dự án Electron riêng:

```powershell
cd cap-xa
npm install
npm run build:win
```

```powershell
cd tram-y-te-hiep-hung
npm install
npm run build:win
```

File cài đặt sẽ nằm trong `dist/` của từng dự án.

## Lưu ý quan trọng

- Không gửi tên bệnh nhân, CCCD, hồ sơ bệnh án hay văn bản mật
  vào Gemini. Chỉ gửi khung văn bản chung hoặc đoạn văn đã xóa
  thông tin cá nhân.
- Kiểm tra lại tên, số, ngày và căn cứ trước khi ký và phát hành.
- Cơ quan chủ quản của Trạm Y tế Xã Hiệp Hưng trong bản trạm
  đang để dạng giữ chỗ, phải xác nhận với Trung tâm Y tế quản lý
  trực tiếp trước khi phát hành văn bản.
- Repo này không chứa key bản quyền riêng, key Gemini, token
  hay văn bản thật của cơ quan. Chỉ khóa công khai kiểm tra key
  mới nằm trong code, như thiết kế gốc.

# Soạn thảo văn bản NĐ30 — Trạm Y tế Xã Hiệp Hưng, Cần Thơ

Tác giả phần mềm: Nguyễn Công Dinh, Cần Thơ.
Hỗ trợ kỹ thuật và cấp key: Zalo 0386435510.
Đơn vị sử dụng trong bản này: Trạm Y tế Xã Hiệp Hưng, Cần Thơ.
Dùng thử: 30 ngày miễn phí từ lần mở đầu tiên.
Phiên bản: 1.0.0. File cài đặt dự kiến:
`Soan-thao-ND30-Tram-Y-Te-Hiep-Hung-Setup.exe`.

## 1. Đã thay đổi gì so với bản cấp xã

- Tên và tiêu đề app đổi thành Trạm Y tế Xã Hiệp Hưng.
- Hồ sơ mặc định mới:
  - Cơ quan ban hành: `TRẠM Y TẾ XÃ HIỆP HƯNG`
  - Viết tắt: `TYT`
  - Địa danh: `Hiệp Hưng, Cần Thơ`
  - Người đứng đầu mặc định: `TRẠM TRƯỞNG`
  - Ký trực tiếp, không tự thêm KT. trừ khi bạn chọn.
- Nút hồ sơ nhanh mới: Trạm Y tế Xã Hiệp Hưng, bên cạnh 3 nút
  UBND xã, HĐND xã và Văn phòng.
- Số ký hiệu gợi ý cho trạm: `.../CV-TYT` cho công văn,
  `.../BC-TYT` cho báo cáo, `.../KH-TYT` cho kế hoạch,
  `.../TB-TYT` cho thông báo, `.../GM-TYT` cho giấy mời.
- Cơ quan chủ quản trong hồ sơ mặc định đang để dạng giữ chỗ:
  `TRUNG TÂM Y TẾ [TÊN KHU VỰC — XÁC NHẬN TRƯỚC KHI PHÁT HÀNH]`.
  **Chưa phát hành văn bản nào bằng hồ sơ này cho tới khi bạn
  xác nhận tên cơ quan chủ quản thật với Trung tâm Y tế quản lý
  trực tiếp.** Mình không tự bịa tên khu vực, vì Hiệp Hưng đã
  thay đổi đơn vị hành chính sau sáp nhập và mô hình 2 cấp.
- Dùng thử vẫn là 30 ngày, `TRIAL_DAYS = 30`, không đổi logic
  kiểm tra key. Khóa công khai trong code vẫn giữ nguyên.

## 2. Về key 30 ngày — nói rõ, không bịa key

Bản này đã có sẵn dùng thử 30 ngày từ lần mở đầu tiên, nên
Trạm Y tế Xã Hiệp Hưng có thể dùng ngay 30 ngày mà không cần
nhập key.

Key chính thức sau dùng thử, hoặc key kích hoạt dài hạn, phải
do tác giả cấp, vì key trong phần mềm này được ký bằng khóa
riêng ECDSA P-256 mà chỉ tác giả mới có. Mình không có khóa
riêng đó, và không được tự tạo một chuỗi key trông giống thật
để bạn nhập, vì key đó sẽ bị bộ kiểm tra trong app từ chối.

### Mẫu nhắn xin key, gửi cho tác giả qua Zalo 0386435510

```
Chào anh Dinh, em xin cấp key phần mềm Soạn thảo văn bản NĐ30
cho đơn vị: Trạm Y tế Xã Hiệp Hưng, Cần Thơ.
Người liên hệ: [họ tên, số điện thoại của trạm]
Thời hạn mong muốn: 30 ngày, bắt đầu từ ngày [ngày/tháng/năm].
Mục đích: dùng thử cho công tác văn thư tại trạm.
Nhờ anh gửi key và hướng dẫn kích hoạt giúp em. Cảm ơn anh.
```

Khi nhận được key thật, vào app, bấm Bản quyền, dán key và tên
đơn vị, bấm Kích hoạt. Nhãn sẽ chuyển thành Đã kích hoạt và
hiện hạn dùng.

## 3. Kết nối Gemini để phân tích và tư vấn

### Nguyên tắc bắt buộc
- Gemini chỉ phân tích và tư vấn, không ký, không quyết định,
  không tự đặt số văn bản, ngày, số tiền hay tên người.
- **Không gửi vào Gemini:** tên bệnh nhân, số CCCD, hồ sơ bệnh
  án, kết quả xét nghiệm, văn bản mật hay văn bản nội bộ.
- Chỉ gửi: khung văn bản chung, câu hỏi chung, đoạn văn đã xóa
  hết thông tin cá nhân, hoặc căn cứ pháp lý công khai cần tra
  cứu lại.
- Trước khi gửi, app bắt tick xác nhận đoạn gửi không chứa
  thông tin nhạy cảm. Nếu chưa tick, app không gọi Gemini.
- Cán bộ phải kiểm tra lại tên, số, ngày, căn cứ và nội dung
  trước khi ký và phát hành, kể cả khi Gemini nói đã đúng.

### Cách key Gemini được lưu
- Key Gemini là key riêng của trạm, lấy từ Google AI Studio,
  không phải key bản quyền NĐ30.
- Trong bản Electron, key được nhập ở panel Gemini, lưu bằng
  `safeStorage` của hệ thống vào thư mục dữ liệu của app, đã mã
  hóa, không nằm trong code HTML, không nằm trong file
  `package.json` hay `main.js` dưới dạng chữ thường.
- Lời gọi Gemini đi từ tiến trình chính của Electron
  (`main.js`) sang Google, qua header `x-goog-api-key`, không
  gửi qua renderer và không đưa key vào đường link.
- Nếu key bị lộ, vào Google AI Studio thu hồi key cũ và tạo
  key mới, rồi lưu lại trong app.
- Model mặc định trong panel là `gemini-2.5-flash`. Bạn có thể
  đổi model trong ô Model, nhưng phải kiểm tra lại tên model
  còn được Google hỗ trợ vào thời điểm dùng.

### 3 việc Gemini làm trong bản này
1. **Phân tích văn bản:** chỉ ra chỗ thiếu, chỗ chưa rõ, chỗ
   cần kiểm tra lại trong trích yếu, căn cứ và nội dung.
2. **Tư vấn soạn thảo:** gợi ý dàn ý cho công văn, báo cáo,
   kế hoạch của trạm, theo văn phong hành chính.
3. **Kiểm tra căn cứ:** gợi ý cách dẫn căn cứ, và ghi rõ chỗ
   nào cần tra lại văn bản gốc, không được bịa căn cứ.

### Panel Gemini nằm ở đâu
Panel nằm ở cuối trang app, sau phần Wizard. Trên bản web
thường, panel sẽ báo là chỉ chạy trong bản Electron đã lưu
key, và sẽ không gửi gì đi. Trên bản Electron, nhập key, bấm
Lưu key trên máy này, tick xác nhận, nhập câu hỏi hoặc đoạn
văn, rồi bấm Phân tích và tư vấn.

## 4. Build trên Windows

```powershell
cd nd30-tram-y-te-hiep-hung
npm install
npm run build:win
```

File ra ở `dist\Soan-thao-ND30-Tram-Y-Te-Hiep-Hung-Setup.exe`.

## 5. Checklist trước khi đưa cho trạm dùng

- [ ] Xác nhận tên cơ quan chủ quản thật, thay chỗ giữ
      `[TÊN KHU VỰC]` trước khi phát hành văn bản.
- [ ] Mở app lần đầu, kiểm tra dùng thử còn 30 ngày.
- [ ] Bấm hồ sơ Trạm Y tế Xã Hiệp Hưng, kiểm tra cơ quan,
      viết tắt TYT, người ký TRẠM TRƯỞNG.
- [ ] Soạn thử một công văn và một báo cáo của trạm, tải Word
      và mở được bằng Word.
- [ ] Nhập key Gemini của trạm, thử phân tích một đoạn văn đã
      xóa thông tin cá nhân, kiểm tra kết quả trả về.
- [ ] Thử gửi khi chưa tick xác nhận, app phải chặn và không
      gọi Gemini.
- [ ] Tắt mạng, vẫn soạn và xuất Word bình thường, chỉ riêng
      Gemini báo không gọi được, đúng như thiết kế.
- [ ] Xin key chính thức từ tác giả bằng mẫu ở mục 2, nếu trạm
      muốn dùng sau 30 ngày dùng thử.

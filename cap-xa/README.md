# Soạn thảo văn bản NĐ30 - Cấp xã — Bản Electron .exe

Tác giả: Nguyễn Công Dinh, Cần Thơ.
Hỗ trợ kỹ thuật và cấp key: Zalo 0386435510.
Dùng thử: 30 ngày miễn phí từ lần mở đầu tiên.
Phiên bản: 1.0.0. File cài đặt dự kiến: `Soan-thao-ND30-Cap-Xa-Setup.exe`.

## 1. Đã làm gì theo prompt

### A. Giao diện Wizard 5 bước
Màn hình chính khi mở app có 3 nút lớn:

- Soạn văn bản mới
- Mở file (.docx, .pdf)
- Quản lý bản nháp

Thanh tiến trình cố định trên cùng, bấm chuyển bước tự do,
dữ liệu đã nhập không mất khi chuyển bước:

1. **Chọn cơ quan:** 3 nút hồ sơ cấp xã. Bấm nút là tự điền
   cơ quan và thẩm quyền ký, rồi nhảy sang bước 2.
2. **Thông tin chung:** loại văn bản, số, ngày, trích yếu,
   kính gửi, căn cứ, ký và nơi nhận.
3. **Soạn nội dung:** ô nội dung, cộng thêm trình soạn bảng
   dạng lưới, có nút Thêm dòng, Xóa dòng, Thêm cột, Xóa cột.
   Bảng soạn ở lưới được chuyển thành dạng `| ô 1 | ô 2 |`
   trong nội dung, để bộ xuất Word cũ vẫn đọc được.
4. **Kiểm tra NĐ30:** bảng điểm thể thức thang 100, phân loại
   Lỗi (đỏ), Cần xem (vàng), Gợi ý (xanh), nút Chuẩn hóa NĐ30
   trên thanh công cụ.
5. **Xem trước và xuất:** trang A4 thời gian thực, lề
   20-20-30-15 mm, Times New Roman, nút Tải Word .docx, In/PDF,
   Sao chép.

Nói rõ để không gây hiểu lầm: Wizard ở bản này được xây bằng
cách điều khiển các khối nhập, kiểm tra và xem trước của bộ
máy NĐ30 gốc, chứ không viết lại toàn bộ bộ máy kiểm tra và
xuất Word từ đầu. Nhờ vậy bộ kiểm tra, bộ chuẩn hóa và bộ tạo
.docx thuần client-side của file gốc vẫn giữ nguyên, và rủi ro
sai thể thức thấp hơn so với viết lại.

### B. Chuẩn hóa cho cấp xã, mô hình 2 cấp 2026
- Mặc định mới: cơ quan chủ quản `ỦY BAN NHÂN DÂN TỈNH [TÊN TỈNH]`,
  cơ quan ban hành `ỦY BAN NHÂN DÂN XÃ [TÊN XÃ]`, viết tắt `UBND`,
  đơn vị soạn thảo để trống cho UBND xã, người đứng đầu mặc định
  `CHỦ TỊCH`.
- 3 hồ sơ nhanh:
  - **UBND xã:** `.../QĐ-UBND`, `.../KH-UBND`, `.../BC-UBND`,
    `.../CV-UBND`. Ký `TM. ỦY BAN NHÂN DÂN - CHỦ TỊCH` hoặc
    `KT. CHỦ TỊCH - PHÓ CHỦ TỊCH`.
  - **HĐND xã:** `.../NQ-HĐND`. Ký `TM. HỘI ĐỒNG NHÂN DÂN - CHỦ TỊCH`
    hoặc `KT. CHỦ TỊCH - PHÓ CHỦ TỊCH`.
  - **Văn phòng HĐND và UBND xã:** `.../TB-VP`, `.../GM-VP`.
    Ký `TL. ỦY BAN NHÂN DÂN - CHÁNH VĂN PHÒNG` hoặc
    `KT. CHÁNH VĂN PHÒNG - PHÓ CHÁNH VĂN PHÒNG`.
- Chữ viết tắt tự động đổi từ BVĐK, TYT, TTYT, SYT, TCKT sang
  UBND, HĐND, VP.
- Tên cơ quan, địa danh và ví dụ bệnh viện đã được thay bằng
  ví dụ cấp xã. Dữ liệu mẫu trong prompt dùng Xã Tân Hưng,
  Ấp 1, Nguyễn Văn A.
- Lưu ý về số dòng: prompt ghi file gốc 1.737 dòng, nhưng file
  thực tế bạn gửi là **1.786 dòng, 192.601 byte**. Bản cấp xã
  trong dự án này là 1.892 dòng sau khi thêm Wizard, trình soạn
  bảng và màn hình chính.

### C. Bản quyền và dùng thử
- Đã đổi `TRIAL_DAYS = 7` thành `TRIAL_DAYS = 30` ở dòng
  `LIC_EPOCH` trong file `app/nd30-cap-xa.html`.
- Logic tính ngày còn lại không đổi công thức, chỉ đổi hằng số:
  `còn lại = 30 - số ngày từ lần mở đầu tiên`.
- Hộp thoại bản quyền và hướng dẫn đã đổi liên hệ thành
  Nguyễn Công Dinh, Zalo 0386435510, và bỏ liên hệ tác giả cũ
  theo quyết định của bạn ở các tin nhắn trước.
- Khóa công khai ECDSA P-256 trong code được giữ nguyên để
  kiểm tra key. Không có khóa riêng nào được đưa vào dự án này.

### D. Đóng gói Electron
- `package.json`: Electron, electron-builder, script
  `npm run build:win`, cấu hình NSIS, tên sản phẩm
  `Soạn thảo văn bản NĐ30 - Cấp xã`, phiên bản 1.0.0, file đầu ra
  `Soan-thao-ND30-Cap-Xa-Setup.exe`, tạo shortcut Desktop và
  Start Menu, cho phép đổi thư mục cài đặt, không bật tự động
  cập nhật ngầm.
- `main.js`: vòng đời app, menu, IPC đọc và ghi bản nháp JSON
  trong `app.getPath('userData')/drafts/`, xuất và nhập bản nháp
  JSON, hộp thoại Về phần mềm.
- `preload.js`: chỉ lộ cầu nối `window.nd30` qua ContextBridge.
  Renderer không dùng Node trực tiếp. Cấu hình trong `main.js`:
  `contextIsolation: true`, `nodeIntegration: false`.
- Bản nháp: tự động lưu vào Electron mỗi 30 giây, cộng thêm
  bộ nhớ localStorage của bộ máy gốc cho phiên đang soạn.
  Mở lại bản nháp từ màn hình Quản lý bản nháp sẽ nạp lại dữ
  liệu và tải lại trang.

### E. Offline và an toàn dữ liệu
- `pdf.js 3.11.174` đã được tải về và đóng gói trong
  `app/vendor/pdfjs/pdf.min.js` và `pdf.worker.min.js`. Bộ đọc
  PDF không còn gọi CDN cdnjs.
- Không còn lời gọi API Claude trên web trong bản Electron:
  trên máy này không có `window.claude`, nên nút AI của bản gốc
  đã ẩn sẵn, chỉ còn Viết theo mẫu và Dựng khung theo mẫu bằng
  mẫu nội bộ.
- Không gửi tiêu đề, nội dung hay số liệu văn bản lên máy chủ.
- Phông chữ: trang A4 dùng Times New Roman có sẵn trên Windows.
  Giao diện Wizard dùng Segoe UI của hệ thống, có Be Vietnam Pro
  làm lựa chọn nếu máy đã cài. Thư mục phông riêng chưa được
  đóng gói vì phông Times New Roman là phông hệ thống Windows,
  không được phép đóng gói lại tùy tiện.

## 2. Cấu trúc dự án

```
nd30-cap-xa-exe/
  package.json
  main.js
  preload.js
  README.md
  app/
    nd30-cap-xa.html   # bản cấp xã + Wizard + trình soạn bảng
    vendor/pdfjs/
      pdf.min.js
      pdf.worker.min.js
  dist/                 # chỉ có sau khi build trên Windows
    Soan-thao-ND30-Cap-Xa-Setup.exe
```

## 3. Build trên Windows — từng bước

Máy build cần: Windows 10 hoặc 11, 64-bit, đã cài Node.js LTS
và npm. Bản .exe Windows phải build trên Windows, không build
NSIS đầy đủ được từ máy Linux này vì thiếu Wine.

```powershell
cd nd30-cap-xa-exe
npm install
npm run build:win
```

Sau khi build xong, file nằm ở:

```
dist\Soan-thao-ND30-Cap-Xa-Setup.exe
```

Chạy thử trên máy Windows sạch theo checklist ở mục 4 trước
khi gửi cho khách.

Trên máy Linux này mình đã kiểm tra được: `main.js` và
`preload.js` qua cú pháp Node, `package.json` hợp lệ, và các
điểm đổi trong HTML đều có mặt. Mình chưa build ra file .exe
ở đây, vì môi trường này là Linux và không có Wine cho NSIS.

## 4. Checklist kiểm tra trên máy Windows sạch

- [ ] Cài đặt được bằng `Soan-thao-ND30-Cap-Xa-Setup.exe`,
      có shortcut Desktop và Start Menu, gỡ cài đặt sạch.
- [ ] Mở app thấy màn hình chính, tên sản phẩm, tác giả
      Nguyễn Công Dinh, Zalo 0386435510, và badge dùng thử.
- [ ] Lần mở đầu tiên hiện dùng thử còn 30 ngày, không phải
      7 ngày.
- [ ] Bấm 3 hồ sơ UBND xã, HĐND xã, Văn phòng, kiểm tra số ký
      hiệu và thẩm quyền ký tự điền đúng.
- [ ] Soạn bảng bằng lưới, bấm Chuyển bảng vào nội dung, xem
      trước A4 hiện đúng bảng.
- [ ] Bấm Chuẩn hóa NĐ30, kiểm tra điểm thể thức và danh sách
      Lỗi, Cần xem, Gợi ý.
- [ ] Tải Word .docx và mở được bằng Word, đúng khổ A4 và lề.
- [ ] Mở file .docx và .pdf có sẵn, trong đó có PDF mà không
      cần mạng, vì pdf.js đã đóng gói nội bộ.
- [ ] Đóng app rồi mở lại, bản nháp tự động lưu vẫn còn.
- [ ] Xuất bản nháp JSON, sang máy khác bấm Phục hồi bản nháp
      thì đọc lại được.
- [ ] Tắt mạng, vẫn mở app, soạn và xuất Word bình thường.
- [ ] Không thấy nút Viết bằng AI đám mây, chỉ còn Viết theo
      mẫu và Dựng khung theo mẫu.

## 5. Việc còn cần bạn quyết hoặc cung cấp

- Tên tỉnh và tên xã thật để thay `[TÊN TỈNH]` và `[TÊN XÃ]`
  trong hồ sơ mặc định, trước khi gửi cho khách.
- File icon `.ico` chuẩn hành chính, nếu không muốn dùng icon
  mặc định của Electron.
- Có muốn ký mã code signing cho file .exe không. Không ký thì
  Windows vẫn cài được, nhưng lần đầu có thể hiện cảnh báo
  SmartScreen.
- Giá bán và thời hạn key sau dùng thử, nếu khác với chính sách
  dùng thử 30 ngày hiện tại.
- Văn phòng xã có ban hành văn bản riêng bằng dấu của Văn phòng
  không. Nếu không, hồ sơ Văn phòng chỉ nên dùng cho thông báo,
  giấy mời, lịch công tác và văn bản chuyển tiếp, không thay cho
  văn bản của UBND xã và HĐND xã.

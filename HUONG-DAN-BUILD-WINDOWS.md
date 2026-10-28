# Hướng dẫn build bản Windows (.exe) - Soạn thảo ND30

Bản web và bản HTML tải về đã đủ dùng. Bản .exe Windows chỉ cần build khi bạn muốn phát hành file cài đặt cho khách dùng offline, có icon DinhCong và lưu bản nháp trong thư mục dữ liệu của ứng dụng.

## Chuẩn bị trên máy Windows 10/11 64-bit

1. Cài Node.js bản LTS (từ nodejs.org, chọn bản LTS, tick chọn thêm công cụ build nếu trình cài đặt hỏi).
2. Tải kho về máy Windows, hoặc copy 2 thư mục `cap-xa` và `tram-y-te-hiep-hung` từ kho về máy.
3. Mở Terminal / PowerShell trong từng thư mục, chạy:
   ```
   npm install
   npm run build:win
   ```
4. File cài đặt sẽ nằm trong thư mục `dist` của từng bản:
   - Cấp xã: `Soan-thao-ND30-Cap-Xa-Setup.exe`
   - Trạm Y tế: `Soan-thao-ND30-Tram-Y-Te-Hiep-Hung-Setup.exe`
   - Phiên bản hiện tại: 1.0.0. Icon đã gắn sẵn từ logo DinhCong (`icon.ico`).

## Kiểm tra trên máy Windows sạch (chưa từng cài bản này)

- Cài đặt được, có shortcut ngoài Desktop và trong Start Menu, mở lên được.
- Màn hình chính hiện đủ 3 nút: Soạn văn bản mới, Mở file, Quản lý bản nháp, cùng nút Tải file về máy và Thoát phần mềm.
- Dùng thử hiện còn 30 ngày, hộp Bản quyền hiện ID máy, nhập key mới phiên bản 3 đúng ID máy thì kích hoạt được, nhập key sang máy khác thì báo không khớp ID máy.
- Mở file PDF lần đầu cần mạng để tải bộ đọc PDF, sau đó dùng offline được.
- Bản nháp lưu được, tắt mở lại vẫn còn.
- Xuất Word mở được trong Word, in ra đúng trang A4, không có panel Gemini trong bản in.
- Gỡ cài đặt được, không để lại lỗi.

## Về ký mã (code signing)

- Build hiện tại chưa ký mã, vì chưa có chứng chỉ ký mã. Khi khách cài bản chưa ký, Windows SmartScreen có thể cảnh báo. Khách bấm More info rồi Run anyway thì vẫn cài được, nhưng trải nghiệm không đẹp bằng bản đã ký.
- Muốn ký mã thì cần mua chứng chỉ ký mã (Code Signing Certificate) đứng tên tác giả hoặc đơn vị, rồi cấu hình electron-builder với chứng chỉ đó và build lại. Đây là việc cần bạn quyết định mua chứng chỉ hay chấp nhận bản chưa ký ở giai đoạn đầu.
- Tuyệt đối không đưa khóa bí mật cấp key (`private-key.pem`) và chứng chỉ ký mã lên GitHub hay nhóm chat.

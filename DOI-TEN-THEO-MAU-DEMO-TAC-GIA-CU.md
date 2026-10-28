# Đổi tên theo mẫu demo tác giả cũ — cả trang chủ, app và sách

Nguyên tắc: giữ nguyên khung, chức năng và cách trình bày của mẫu demo tác giả cũ, chỉ đổi thông tin tác giả/đơn vị và ví dụ sang tên mới. Không cắt chức năng gốc, không bịa tên cơ quan thật.

## Bảng đổi tên đã áp dụng (mẫu cũ → bản hiện tại)

| Chỗ trong mẫu cũ | Bản hiện tại trên soanthao30 |
|---|---|
| Tác giả VNX Group, Võ Ngọc Xa | Nguyễn Công Dinh, Cần Thơ |
| Liên hệ facebook.com/Joseph.ngocxa | Zalo 0386435510 |
| Dùng tại Bệnh viện Đa khoa khu vực Nguyễn Văn Thủ | Bản Cấp xã (UBND xã, HĐND xã, Văn phòng) và bản Trạm Y tế Xã Hiệp Hưng, Cần Thơ |
| Ví dụ cơ quan: Sở Y tế tỉnh Vĩnh Long | Ví dụ: Ủy ban nhân dân thành phố Cần Thơ; ví dụ tóm tắt cho Trạm Y tế Xã Hiệp Hưng, Cần Thơ |
| Dùng thử 7 ngày | Dùng thử 30 ngày |
| Logo và màu cũ (xanh lá #1a5c3a, đỏ #b3261e) | Logo DinhCong, màu xanh dương #1447a6, nền #eef4fb |
| AI chỉ trong Claude artifact | Bản Trạm Y tế thêm panel Gemini dùng key của khách, kèm xác nhận không có dữ liệu nhạy cảm |
| Không có nút tải về máy, không có nút Thoát trong bước soạn | Có nút "Tải file này về máy (.html)" ở màn hình chính và nút Thoát ở màn hình chính + trong thanh bước soạn |

## Kết quả rà soát ngày 2026-10-28 (cả 3 chỗ)

- Trang chủ `index.html`: không còn VNX, Võ Ngọc Xa, Nguyễn Văn Thủ, Vĩnh Long, "7 ngày", Sở Y tế.
- App Cấp xã và app Trạm Y tế: không còn các cụm trên, không còn Vĩnh Long hay Quới An.
- Sách hướng dẫn 10 trang: không còn các cụm trên; tên Nguyễn Công Dinh xuất hiện 10 lần.
- Chức năng gốc giữ nguyên: app vẫn đủ 97 hàm và 117 ID gốc, cộng thêm các tính năng mới (wizard 5 bước, màn hình chính, ID máy, key phiên bản 3, cảnh báo in).

## Nếu "tên khác" là một tên hoàn toàn mới (không phải Nguyễn Công Dinh)

Chỉ cần gửi đúng 3 thông tin sau, mình sẽ đổi một lượt cả trang chủ, app và sách theo đúng bảng trên, không cần làm lại khung:

1. Tên tác giả mới: ________________
2. Tên đơn vị / thương hiệu mới và logo (nếu có file logo): ________________
3. Số Zalo / liên hệ mới và địa phương mới: ________________

Lưu ý: tên tỉnh/xã thật và tên Trung tâm Y tế quản lý thật vẫn phải điền riêng theo phiếu `THONG-TIN-CAN-DIEN.md`, không tự đoán từ tên tác giả.

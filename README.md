# Hướng dẫn cài đặt

# Manchester City Football Kits - Spring Boot & React Project

Dự án quản lý cửa hàng áo đấu Manchester City, sử dụng kiến trúc Microservices/Decoupled với Spring Boot (Backend) và React (Frontend).

---

## 🚀 Khởi chạy nhanh với Docker (Recommeded)

Cách nhanh nhất để chạy toàn bộ hệ thống (bao gồm Database, BE, FE) mà không cần cài đặt môi trường lẻ:

```bash
# Clone dự án
git clone [https://github.com/Huy132005/Manchester-City-football-kits.git](https://github.com/Huy132005/Manchester-City-football-kits.git)
cd Manchester-City-football-kits

# Khởi chạy bằng Docker Compose
docker-compose up -d --build

cd jersey-shop-be

# Chạy file BE
# Cài đặt các dependency và build file jar
./mvnw clean install 

# Chạy ứng dụng
./mvnw spring-boot:run

# Chạy file FE
cd jersey-shop-fe

# Cài đặt thư viện
npm install

# Chạy ở chế độ Development
npm run dev

---

### Một vài mẹo cho bạn:
1.  **File `.env` cho Docker**: Bạn nên tạo một file `.env` ở thư mục gốc để lưu các biến như `DB_PASSWORD`, `DB_URL` giúp Docker Compose đọc dễ dàng hơn.
2.  **CORS**: Vì Spring Boot và React chạy trên 2 cổng khác nhau, đừng quên cấu hình `@CrossOrigin` trong Controller của Spring hoặc setup Proxy trong React để tránh lỗi chặn truy cập nhé.

**Bạn có muốn mình viết hộ file `Dockerfile` cho phần Backend Spring Boot hoặc Frontend React không?**

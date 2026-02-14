# Manchester City Football Kits - Spring Boot & React Project

Dự án quản lý cửa hàng áo đấu Manchester City, sử dụng kiến trúc Spring Boot (Backend) và React (Frontend). Dự án đã được cấu hình sẵn để triển khai nhanh chóng bằng Docker.

---

## 🚀 Hướng dẫn cài đặt nhanh

### 1. Clone source về
Mở terminal và thực hiện tải mã nguồn từ GitHub:
```bash
git clone [https://github.com/Huy132005/Manchester-City-football-kits.git](https://github.com/Huy132005/Manchester-City-football-kits.git)
cd Manchester-City-football-kits


### 2. Chạy file BE
cd jersey-shop-be

# Cài đặt dependency và build file jar
./mvnw clean install 

# Khởi chạy ứng dụng
./mvnw spring-boot:run

### 3. Chạy file FE
cd jersey-shop-fe

# Cài đặt thư viện
npm install

# Chạy ở chế độ Development (Vite/CRA)
npm run dev

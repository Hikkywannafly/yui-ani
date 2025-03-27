
## Chuẩn bị

1. Đảm bảo bạn đã có tài khoản Heroku và đã cài đặt Heroku CLI
2. Đăng nhập vào Heroku CLI bằng lệnh: `heroku login`

## Các bước triển khai

### 1. Tạo ứng dụng Heroku

```bash
heroku create tên-ứng-dụng-của-bạn
```

### 2. Thiết lập buildpack cho Docker

```bash
heroku stack:set container -a tên-ứng-dụng-của-bạn
```

### 3. Thiết lập các biến môi trường cần thiết

Bạn có thể thiết lập các biến môi trường thông qua giao diện web của Heroku hoặc sử dụng CLI:

```bash
heroku config:set VITE_APP_DOMAIN=tên-miền-của-bạn -a tên-ứng-dụng-của-bạn
```

Các biến môi trường quan trọng cần thiết lập:

- `VITE_APP_DOMAIN`: Tên miền của ứng dụng
- `VITE_BACKEND_URL`: URL của backend API (nếu có)
- `VITE_CORS_PROXY_URL`: URL của CORS proxy (nếu cần)
- `VITE_TMDB_READ_API_KEY`: API key của TMDB (nếu sử dụng)
- `VITE_PWA_ENABLED`: Bật/tắt tính năng PWA ("true" hoặc "false")

### 4. Triển khai lên Heroku

```bash
git add .
git commit -m "Chuẩn bị triển khai lên Heroku"
git push heroku main
```

Nếu bạn đang làm việc trên nhánh khác không phải main, hãy sử dụng:

```bash
git push heroku tên-nhánh:main
```

### 5. Mở ứng dụng

```bash
heroku open -a tên-ứng-dụng-của-bạn
```

## Xử lý sự cố

### Kiểm tra logs

```bash
heroku logs --tail -a tên-ứng-dụng-của-bạn
```

### Khởi động lại ứng dụng

```bash
heroku restart -a tên-ứng-dụng-của-bạn
```

## Lưu ý

- Ứng dụng sử dụng `serve` để phục vụ các tệp tĩnh đã được build
- Heroku tự động gán một cổng thông qua biến môi trường `PORT`
- Dockerfile đã được cấu hình để hoạt động với Heroku
- File `heroku.yml` định nghĩa cách Heroku xây dựng và chạy ứng dụng

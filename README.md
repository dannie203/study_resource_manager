# Study Resource Manager

Hệ thống quản lý tài nguyên học tập (Study Resource Manager)

## 1. Cấu trúc thư mục

```
study_resource_manager/
├── backend/           # Node.js/Express/Prisma REST API
│   ├── src/           # Source code backend
│   ├── prisma/        # Schema, migration, seed
│   ├── uploads/       # File tài liệu upload
│   └── postman-collection.json # Test API
├── frontend/          # Next.js/React UI
│   ├── src/app/       # Trang, layout, page
│   ├── src/components # Component UI
│   └── src/context    # Context, hooks
└── README.md          # Tài liệu tổng quan
```

## 2. Cài đặt & Chạy thử

### Backend
```bash
cd backend
cp env.example .env # Tạo file .env và chỉnh sửa thông tin DB, JWT_SECRET
npm install
npx prisma migrate deploy # hoặc npx prisma migrate dev
npm run dev
```
API chạy tại: http://localhost:5000

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Web chạy tại: http://localhost:3000

## 3. Test API
- Sử dụng file `backend/postman-collection.json` để test toàn bộ API (import vào Postman).
- Đảm bảo backend đang chạy trước khi test.

## 4. Phân quyền hệ thống
- **User**: Đăng ký, đăng nhập, upload tài liệu (trạng thái PENDING), chỉ xem/xóa tài liệu của mình hoặc đã được duyệt, xem thống kê cá nhân.
- **Admin**: Quản lý user, duyệt/xóa tài nguyên, xem tất cả tài nguyên, xem thống kê toàn hệ thống, phân quyền user.

## 5. Một số lệnh phát triển
- Chạy migrate DB: `npx prisma migrate dev`
- Sinh Prisma client: `npx prisma generate`
- Chạy test API: import file postman vào Postman, chọn môi trường, chạy collection.

## 6. Ghi chú bảo trì
- Đảm bảo bảo mật JWT, không commit file .env lên git.
- Khi sửa schema cần migrate lại DB.
- UI hỗ trợ dark/light mode tự động.
- Xem chi tiết phân quyền, trạng thái tài nguyên, thống kê ở giao diện admin/user.

## 7. Refresh Token Usage (For Developers)

### How it works
- When you log in, you receive both an access token (`token`) and a `refreshToken` from the backend.
- The access token is used for authenticating API requests and is stored in `localStorage` as `token`.
- If your access token expires (e.g., you see a 401 Unauthorized error), the frontend can use the `refreshToken` to obtain a new access token by calling:

```ts
fetch('http://localhost:5000/api/auth/refresh-token', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ refreshToken })
})
  .then(res => res.json())
  .then(data => {
    if (data.accessToken) {
      localStorage.setItem('token', data.accessToken);
      // Retry the original request or reload the page
    }
  });
```

### UI Behavior
- If your session expires, the system will attempt to refresh your token automatically (if implemented in the frontend logic).
- If refreshing fails (e.g., refresh token expired), you will be logged out and asked to log in again.

### Notes
- Never share your refresh token. Keep it secure (ideally, use httpOnly cookies for production).
- You can implement automatic token refresh in your API request logic (e.g., with a fetch wrapper or interceptor).

## 8. Đóng góp & liên hệ
- Liên hệ: mayduahayhoc@gmail.com
- Đóng góp: tạo pull request hoặc issue trên GitHub.

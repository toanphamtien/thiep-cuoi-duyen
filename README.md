
<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Hướng dẫn Build & Triển Khai (GitHub Pages)

Tài liệu này hướng dẫn chi tiết cho người mới — cách cài đặt, build và đẩy (deploy) trang web lên **GitHub Pages**.

**Lưu ý**: repo hiện tại đã được cấu hình để phục vụ trên `https://<your-username>.github.io/thiep-cuoi` (trường `base` trong `vite.config.ts` đã đặt thành `/thiep-cuoi/`). Thay `<your-username>` bằng tên GitHub của bạn.

**Yêu cầu trước khi bắt đầu**
- Máy có cài Node.js (phiên bản 16+ khuyến nghị).
- Có tài khoản GitHub và đã tạo repo mới tên `thiep-cuoi` (hoặc bạn có thể dùng tên khác, nhưng khi đó cần cập nhật `base` tương ứng).

## 1) Sao chép code vào máy (nếu chưa có)

Nếu bạn đã clone repo vào thư mục làm việc thì bỏ qua bước này. Nếu chưa, thực hiện:

```bash
git clone https://github.com/<your-username>/thiep-cuoi.git
cd thiep-cuoi
```

Nếu repository chưa tồn tại local và bạn muốn đẩy code hiện tại lên GitHub:

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/<your-username>/thiep-cuoi.git
git branch -M main
git push -u origin main
```

## 2) Cài dependencies

Chạy một trong các lệnh sau để cài toàn bộ package (chạy ở thư mục gốc dự án):

```bash
npm ci    # sạch và cài nhanh (nếu bạn đã có package-lock.json)
# hoặc
npm install
```

## 3) Kiểm tra cấu hình Vite cho GitHub Pages

Để assets hoạt động chính xác trên GitHub Pages khi repo không đặt ở root domain, file `vite.config.ts` cần có `base` tương ứng:

- Nếu repo tên `thiep-cuoi`, đặt `base: '/thiep-cuoi/'`.
- Nếu bạn host ở username.github.io (repo tên `username.github.io`), có thể để `base: '/'`.

Bạn đã đặt `base` rồi (xem `vite.config.ts`). Nếu đổi tên repo, hãy cập nhật `base` cho phù hợp.

## 4) Build và kiểm tra bản build cục bộ

Build project:

```bash
npm run build
```

Sau khi build xong, thư mục output mặc định là `dist`.

Bạn có thể xem thử bản build bằng lệnh preview (từ thư mục gốc):

```bash
npm run preview
# rồi mở http://localhost:4173 (port mặc định) hoặc xem terminal để biết port
```

## 5) Deploy nhanh bằng `gh-pages` (cách đơn giản nhất)

Trong dự án này đã thêm sẵn script deploy và package `gh-pages`. Cách deploy:

1. Đảm bảo bạn đã push code lên GitHub (branch `main` hoặc `master`).
2. Chạy:

```bash
npm run deploy
```

Lệnh trên sẽ chạy `build` rồi publish nội dung `dist` lên branch `gh-pages` của repo. Sau vài phút, trang sẽ có tại:

```
https://<your-username>.github.io/thiep-cuoi
```

## 6) Kiểm tra và cấu hình GitHub Pages (nếu cần)

1. Vào repo trên GitHub → **Settings** → **Pages**.
2. Kiểm tra Source: nếu dùng `gh-pages` thì source thường là `gh-pages` branch.
3. Nếu thấy 404, đợi vài phút để GitHub cập nhật, xóa cache trình duyệt, hoặc kiểm tra `base` trong `vite.config.ts`.

## 7) Phương án thay thế: deploy bằng GitHub Actions (tự động khi push)

Nếu bạn muốn tự động deploy khi push lên `main`, tạo file workflow `.github/workflows/deploy.yml` với nội dung ví dụ:

```yaml
name: Build and Deploy to GitHub Pages

on:
   push:
      branches:
         - main

jobs:
   build:
      runs-on: ubuntu-latest
      steps:
         - uses: actions/checkout@v4
         - name: Use Node.js
            uses: actions/setup-node@v4
            with:
               node-version: '20'
         - name: Install dependencies
            run: npm ci
         - name: Build
            run: npm run build
         - name: Deploy
            uses: peaceiris/actions-gh-pages@v3
            with:
               github_token: ${{ secrets.GITHUB_TOKEN }}
               publish_dir: ./dist
```

Push file này lên `main` — Action sẽ tự chạy và đẩy `dist` lên `gh-pages` mỗi lần bạn push.

## 8) Một số lỗi thường gặp và cách xử lý
- Trang hiện 404: kiểm tra `base` trong `vite.config.ts` có đúng repo name không.
- Asset (css/js) bị lỗi đường dẫn: do thiếu `base` hoặc `base` sai.
- GitHub Pages chưa hiển thị: đợi 1–5 phút, sau đó refresh (Ctrl+F5) hoặc clear cache.
- Nếu bạn muốn dùng folder `docs` trên `main` thay vì `gh-pages`: cấu hình build `outDir: 'docs'` (trong `vite.config.ts` hoặc dùng `vite build --outDir docs`) rồi push folder `docs` lên `main` và trong Settings → Pages chọn `main`/`/docs`.

## 9) Tóm tắt lệnh quan trọng

```bash
# cài deps
npm install

# build
npm run build

# preview build cục bộ
npm run preview

# deploy nhanh (gh-pages)
npm run deploy
```

---

Nếu bạn muốn, tôi có thể:
- Chạy `npm install` và `npm run deploy` ở container giúp bạn ngay bây giờ.
- Hoặc tạo sẵn file workflow `.github/workflows/deploy.yml` và commit luôn.

Ghi chú: thay `<your-username>` bằng tên GitHub của bạn khi mở URL.

<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1I9GN3QcURoA5dd_1MvrfJabyfEvz8JFS

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

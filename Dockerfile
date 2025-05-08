# Chọn image Node chính thức
FROM node:18-alpine

# Đặt thư mục làm việc trong container
WORKDIR /app

# Copy package.json và cài dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy toàn bộ mã nguồn vào container
COPY . .

# Build ứng dụng (nếu cần, ví dụ Next.js hoặc NestJS)
RUN npm run build

# Expose cổng ứng dụng (tùy theo dự án của bạn)
EXPOSE 3000

# Command để chạy app
CMD ["npm", "start"]

FROM node:18-alpine AS builder
WORKDIR /app
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY frontend/package*.json ./
RUN npm install --only=production
CMD ["npm", "start"]

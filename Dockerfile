# ----------- Build stage -----------
    FROM node:23-alpine AS builder

    WORKDIR /app

    COPY package*.json ./
    RUN npm install --legacy-peer-deps

    COPY . .
    RUN npm run build


    # ----------- Production stage -----------
    FROM node:23-alpine AS runner

    WORKDIR /app

    # Copy production dependencies
    COPY package*.json ./
    RUN npm install --only=production

    # Copy build output from builder
    COPY --from=builder /app/.next .next
    COPY --from=builder /app/public ./public
    COPY --from=builder /app/node_modules ./node_modules

    EXPOSE 3000
    ENV NODE_ENV=production

    CMD ["npm", "run", "start"]

# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Run
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/dist/src/db ./src/db  
COPY --from=builder /app/dist/drizzle.config.js ./

EXPOSE 3000

CMD ["node", "dist/src/main.js"]

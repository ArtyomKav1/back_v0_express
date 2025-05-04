# Шаг 1: Сборка TypeScript
FROM node:23 AS builder  

WORKDIR /app
COPY package*.json ./
COPY tsconfig*.json ./
RUN npm i 

COPY src ./src
RUN npm run build

# Шаг 2: Запуск сервера
FROM node:23-alpine 

WORKDIR /app
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD node dist/index.js  # Убираем квадратные скобки для shell-формата
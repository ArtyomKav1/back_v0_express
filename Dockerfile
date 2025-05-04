# Шаг 1: Сборка TypeScript
FROM node AS builder

WORKDIR /app
COPY package*.json ./
COPY tsconfig*.json ./
RUN npm ci

COPY src ./src
RUN npm run build  # Компиляция TS → JS

# Шаг 2: Запуск сервера
FROM node:alpine

WORKDIR /app
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist  

EXPOSE 3000
CMD ["node", "dist/index.js"]  # Запуск скомпилированного файла
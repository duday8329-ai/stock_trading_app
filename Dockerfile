FROM node:22-alpine AS build

WORKDIR /app

COPY server/package*.json ./server/
RUN npm install --omit=dev --prefix server

COPY client/package*.json ./client/
RUN npm install --include=dev --prefix client

COPY client ./client
RUN npm run build --prefix client

COPY server ./server

ENV NODE_ENV=production
ENV PORT=5000

EXPOSE 5000

CMD ["node", "server/src/index.js"]

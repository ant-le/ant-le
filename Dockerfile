FROM node:22-alpine AS build

WORKDIR /app

COPY package.json package-lock.json svelte.config.js tsconfig.json vite.config.ts ./
COPY messages ./messages
COPY project.inlang ./project.inlang
COPY src ./src
COPY static ./static

RUN npm ci && npm run build

FROM nginxinc/nginx-unprivileged:1.29-alpine

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget -qO- http://127.0.0.1:8080/healthz || exit 1

USER 101

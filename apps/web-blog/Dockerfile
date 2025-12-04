FROM node:20-alpine AS build

RUN npm install -g pnpm@10.22.0

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/web-blog/package.json ./apps/web-blog/
COPY apps/back-blog/package.json ./apps/back-blog/

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm --filter web-blog build

FROM nginx:alpine

COPY --from=build /app/apps/web-blog/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
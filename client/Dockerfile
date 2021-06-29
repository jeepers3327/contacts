FROM node:16-buster-slim as dev

WORKDIR /app

RUN yarn install

COPY . .

EXPOSE 3000

CMD ["yarn", "dev", "--host", "0.0.0.0"]

FROM node:16-buster-slim as build-node

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

RUN yarn build

FROM nginx:1.21.0-alpine as prod
EXPOSE 80

COPY --from=build-node /app/dist/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

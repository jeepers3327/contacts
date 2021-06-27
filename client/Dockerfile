FROM node:16-buster-slim as dev

WORKDIR /app

RUN yarn install

COPY . .

EXPOSE 3000

# Finally runs the application
CMD [ "yarn", "dev", "--host" ]

FROM node:16-buster-slim as prod

WORKDIR /app

COPY package.json yarn.lock ./
COPY vite.config.ts ./
COPY .env.production ./
COPY src ./src/
COPY tsconfig.json ./
COPY index.html ./

RUN yarn install && yarn build

EXPOSE 3000
FROM node:16-bullseye

RUN mkdir -p /app
WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

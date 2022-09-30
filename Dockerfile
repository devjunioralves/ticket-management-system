FROM node:16.17.1-alpine

WORKDIR /usr/app
COPY package.json yarn.lock ./

RUN yarn

COPY . .

EXPOSE 3000
cmd ["yarn", "dev"]
FROM node:lts-slim

WORKDIR ./

COPY ["package.json", "yarn.lock", "./"]

RUN yarn install

COPY . .

RUN ["ls"]

CMD yarn start


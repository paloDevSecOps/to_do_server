FROM node:lts-slim

COPY ["package.json", "yarn.lock", "$HOME/"]

RUN yarn install

COPY . .

CMD yarn start


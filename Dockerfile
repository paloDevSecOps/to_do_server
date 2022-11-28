FROM node:lts-slim

COPY ["package.json", "$HOME/"]

RUN yarn install

COPY . .

CMD yarn build && yarn start:prod


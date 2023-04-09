FROM node:alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install

COPY . /usr/src/app

ENV PORT=3000

EXPOSE 9090:3000

CMD [ "node","index.js"]
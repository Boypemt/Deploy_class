FROM node:24

WORKDIR /usr/src/app

COPY package.json /usr/src/app
RUN npm install

COPY . /usr/src/app

EXPOSE 3000

CMD ["node", "dist/index.js"]
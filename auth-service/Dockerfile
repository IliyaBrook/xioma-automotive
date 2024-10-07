FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN yarn install
COPY . .
RUN yarn build

EXPOSE 4001

CMD ["node", "dist/app.js"]

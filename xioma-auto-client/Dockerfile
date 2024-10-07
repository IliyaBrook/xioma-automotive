FROM node:20.16.0-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn run build

FROM nginx:alpine

COPY --from=build /usr/src/app/dist /usr/share/nginx/html

COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

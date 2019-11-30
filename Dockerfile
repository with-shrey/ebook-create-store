FROM node:8.16.0 as backendBuilder
WORKDIR /apps/ah
COPY package.json ./
RUN npm install
COPY . .
RUN npm run sdk
CMD ["npm", "start"]

FROM node:10.12.0-alpine as clientBuilder
WORKDIR /apps/ah
COPY ./client/package.json ./
RUN npm install
COPY ./client ./
COPY --from=backendBuilder /apps/ah/client/src/app/shared/lb-sdk ./src/app/shared/lb-sdk
RUN npm run build

FROM nginx:stable as rpBuilder
WORKDIR /usr/share/nginx/html
RUN mkdir /usr/share/nginx/html
COPY --from=clientBuilder /apps/ah/dist /usr/share/nginx/html
COPY ./reverse-proxy/ngnix.prod.conf /etc/nginx/conf.d/default.conf
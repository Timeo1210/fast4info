FROM node:current-alpine
WORKDIR /app
COPY package.json /app
RUN apk add --no-cache --virtual .build-deps make gcc g++ python
RUN npm install
RUN apk del .build-deps
COPY . /app
CMD ["npm", "start"]
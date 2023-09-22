FROM node:18

# Tạo một thư mục làm việc
WORKDIR /usr/src/app

COPY package*.json .

RUN yarn install

COPY . .

EXPOSE 8080

CMD [ "yarn","start"]


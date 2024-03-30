FROM node:21-alpine as builder

# 앱 디렉터리 생성
WORKDIR /app

# 앱 의존성 설치
COPY package*.json ./

RUN yarn add
# 앱 소스 추가
COPY . .

EXPOSE 8000
CMD [ "ts-node", "src/server.ts" ]
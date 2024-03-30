FROM node:21-alpine as builder

# 앱 디렉터리 생성
WORKDIR /app

# 앱 의존성 설치
COPY package.json yarn.lock node_modules ./
COPY . .

EXPOSE 8000
CMD [ "yarn", "start" ]
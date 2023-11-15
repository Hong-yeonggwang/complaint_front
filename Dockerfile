# FROM node:18 as build-stage
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# RUN npm run build

# FROM nginx:1.21
# # Nginx 설정 파일을 컨테이너 내의 설정 위치로 복사
# # RUN rm -rf /etc/nginx/conf.d/default.conf
# COPY --from=build-stage /app/nginx/default.conf /etc/nginx/conf.d/default.conf

# # RUN rm -rf /usr/share/nginx/html/*
# COPY --from=build-stage /app/dist /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]


FROM node:18
WORKDIR /app

COPY package.json .

ADD . .
RUN npm install

EXPOSE 8080

CMD ["npm", "run", "serve"]
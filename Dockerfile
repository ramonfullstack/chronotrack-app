# stage 1
FROM node:18.10 as node
WORKDIR /app-chronotrack
COPY . .
RUN npm install
RUN npm ci
RUN npm run build

# stage 2
FROM nginx
COPY default.conf /etc/nginx/conf.d
COPY --from=node /app-chronotrack/dist/app-chronotrack /usr/share/nginx/html

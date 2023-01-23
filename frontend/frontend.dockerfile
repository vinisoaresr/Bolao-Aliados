# Build Stage
FROM node:18-alpine as build
WORKDIR /app
ENV NODE_OPTIONS=--max_old_space_size=4096
# Resolve dependencies
COPY frontend/package.json ./
COPY frontend/package-lock.json ./
RUN npm ci
# Build app
COPY /frontend/. .
RUN npm run build


# Final Stage 
FROM nginx:latest   
COPY --from=build /app/build /var/www/bolaoaliados/html
COPY /frontend/nginx.conf /etc/nginx/nginx.conf

RUN chmod 755 -R /var/www/bolaoaliados/html

EXPOSE 3000

ENTRYPOINT [ "nginx" ]
CMD [ "-g", "daemon off;" ]

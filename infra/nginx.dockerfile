FROM nginx:latest   

COPY /infra/nginx.conf /etc/nginx/nginx.conf

# TODO add not found page / error page
# COPY --from=build /app/build /var/www/bolaoaliados/html
# RUN chmod 755 -R /var/www/bolaoaliados/html

EXPOSE 80
EXPOSE 443

ENTRYPOINT [ "nginx" ]
CMD [ "-g", "daemon off;" ]
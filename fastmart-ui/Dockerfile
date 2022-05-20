# production environment
FROM nginx:stable-alpine
RUN rm -rf /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY public /usr/share/nginx/html
EXPOSE 443
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

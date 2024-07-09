# ÉTAPE 1 : construire l'application
FROM node:18-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# ÉTAPE 2 : configurer et démarrer nginx
FROM nginx:1.21.6-alpine
COPY --from=build-stage /app/build /usr/share/nginx/html

RUN sed -i 's/listen       80;/listen       8080;/g' /etc/nginx/conf.d/default.conf

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]

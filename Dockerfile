# Usar uma imagem do Node.js para construir o frontend
FROM node:lts-alpine AS build-stage
WORKDIR /app
COPY . .
RUN npm install && npm run build 
#COPY . .

# Usar NGINX para servir os arquivos estáticos
FROM nginx:alpine
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Copiar a configuração do NGINX
COPY default.conf /etc/nginx/conf.d/default.conf

# Expor a porta 80 para o container
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

# Build stage
FROM node:18-alpine as builder
WORKDIR /app

# Instalar dependencias primero
COPY package*.json ./
RUN npm ci

# Copiar el resto del código
COPY . .

# Construir la aplicación
RUN npm run build -- --configuration=production

# Etapa de producción
FROM nginx:alpine

# Crear directorios necesarios
RUN mkdir -p /usr/share/nginx/html

# Copia los archivos construidos
COPY --from=builder /app/dist/abcall/* /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/templates/default.conf.template

# Script de inicio
COPY docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh && \
    chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

# Configuración de puerto
ENV PORT=8080
EXPOSE 8080

# Se agrega el healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:8080/health || exit 1

# Usar el script de inicio
ENTRYPOINT ["/docker-entrypoint.sh"]
#!/bin/sh

# Reemplazar la variable PORT en la configuración de nginx
envsubst '${PORT}' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf

# Verificar la configuración de nginx
nginx -t

# Iniciar nginx en primer plano
exec nginx -g 'daemon off;'
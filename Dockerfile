FROM node:18-slim
WORKDIR /app
COPY . .
# Forzamos que use el puerto 7000
ENV DASHBOARD_PORT=7000
EXPOSE 7000
CMD ["node", "server.js"]

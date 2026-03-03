FROM node:18-slim
WORKDIR /app
COPY . .
EXPOSE 7000
CMD ["node", "server.js"]

FROM node:alpine

WORKDIR /app
COPY package.json .
# do not install dev dependencies
RUN npm install --only=prod
COPY . .

CMD ["npm", "start"]
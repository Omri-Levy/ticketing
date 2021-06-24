FROM node:alpine

WORKDIR /app
COPY package.json .
ENV NODE_ENV production
RUN npm install
COPY . .

CMD ["npm", "start"]

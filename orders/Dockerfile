FROM node:alpine

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .

RUN npx tsc
ENV NODE_ENV production
CMD ["node", "build/index.js"]

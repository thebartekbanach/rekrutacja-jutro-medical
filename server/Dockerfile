FROM node:16-alpine AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


FROM node:16-alpine AS production

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./
RUN npm ci

COPY --chown=node:node . .

ENV NODE_ENV production

RUN npm run build

RUN chown node -R /usr/src/app

USER node

CMD ["npm", "start"]

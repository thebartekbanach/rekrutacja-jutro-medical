FROM node:16.14.0 AS base

WORKDIR /src/client


FROM base AS dev

ENV NODE_ENV development

ENTRYPOINT ["/bin/bash", "./entrypoint.sh"]


FROM base AS prod

COPY --chown=node:node package*.json ./
RUN npm ci

COPY --chown=node:node . .

ENV NODE_ENV production

RUN npm run build

USER node

CMD ["npm", "start"]

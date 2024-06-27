FROM node:20.14.0-alpine as builder
USER node
WORKDIR /home/node/app
COPY --chown=node:node ./package*.json ./
RUN npm install
COPY --chown=node:node . .
RUN echo "NODE_ENV=production" >> .env.production \
    echo "NEXT_PUBLIC_AUTH_BASE_URL=http://auth:3000" >> .env.production \
    echo "NEXT_PUBLIC_THERAPISTS_BASE_URL=http://therapists:3002" >> .env.production
RUN npm run build

FROM node:20.14.0-alpine as production

USER node

WORKDIR /home/node/app

COPY --from=builder --chown=node:node /home/node/app/.next ./.next
COPY --from=builder --chown=node:node /home/node/app/node_modules ./node_modules
COPY --from=builder --chown=node:node /home/node/app/package.json ./package.json
COPY --from=builder --chown=node:node /home/node/app/public ./public
COPY --from=builder --chown=node:node /home/node/app/.env.production ./.env.production


CMD ["npm", "start"]

FROM harbor.eos.netrtl.com/docker/library/node:16-alpine as node-alpine

# Builder Stage
FROM node-alpine as backend

# TODO: this is needed when using node's native packages. Hopefully this can be removed some day 🙏
RUN apk add --no-cache python3 make g++

USER node
WORKDIR /home/node/

COPY ./backend /home/node/

RUN npm ci
RUN npm run build

# Builder Stage
FROM node-alpine as frontend

# TODO: this is needed when using node's native packages. Hopefully this can be removed some day 🙏
RUN apk add --no-cache python3 make g++

USER node
WORKDIR /home/node/

COPY ./frontend /home/node/

RUN npm ci
RUN npm run build

# Production Stage
FROM node-alpine

USER node
WORKDIR /home/node/

COPY --from=backend /home/node/ ./
COPY --from=frontend /home/node/dist ./frontend

EXPOSE 3001

CMD ["node", "main.js" ]

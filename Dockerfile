FROM harbor.eos.netrtl.com/docker/library/node:18-alpine as node-alpine

# Builder Stage
FROM node-alpine as builder

# TODO: this is needed when using node's native packages. Hopefully this can be removed some day 🙏
RUN apk add --no-cache python3 make g++

WORKDIR /home/node/

COPY ./ /home/node/

RUN npm ci
RUN npm run app:build

# Production Stage
FROM node-alpine

WORKDIR /home/node/

COPY --from=builder /home/node/dist ./
COPY --from=builder /home/node/node_modules ./node_modules
COPY --from=builder /home/node/package.json ./package.json

EXPOSE 3001
CMD ["node", "main.js" ]

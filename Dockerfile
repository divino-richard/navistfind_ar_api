# 1. Build stage
FROM node:20-alpine AS builder

WORKDIR /rest-api

COPY package.json yarn.lock ./

# Install OpenSSL dependencies
RUN apk add --no-cache openssl

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn db:generate

RUN yarn build

# 2. Production image
FROM node:20-alpine

WORKDIR /rest-api

COPY package.json yarn.lock ./

# Install OpenSSL dependencies
RUN apk add --no-cache openssl

RUN yarn install --frozen-lockfile --production

COPY --from=builder /rest-api/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /rest-api/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder /rest-api/dist ./dist

EXPOSE 4000

CMD ["node", "dist/index.js"]

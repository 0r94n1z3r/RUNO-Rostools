# syntax = docker/dockerfile:1

ARG NODE_VERSION=22.12.0

FROM node:${NODE_VERSION}-slim AS base


ARG PORT=3000

#ENV BASE_URL=https://tetrisvn.ru/api
ENV NODE_ENV=production

WORKDIR /src

# Build
FROM base AS build

ENV NODE_ENV=development

ARG BASE_URL=/api
ENV BASE_URL=${BASE_URL}

ARG NUXT_API_BASE_URL=https://new.rostools.ru/api
ENV NUXT_API_BASE_URL=${NUXT_API_BASE_URL}

ARG NUXT_DEBUG_HYDRATION=0
ENV NUXT_DEBUG_HYDRATION=${NUXT_DEBUG_HYDRATION}

ENV NODE_OPTIONS="--max-old-space-size=2048"

COPY --link package.json package-lock.json ./
#COPY package.json .

RUN npm install --legacy-peer-deps

COPY --link . ./

RUN npm install @popperjs/core@2.11.8 --legacy-peer-deps

ENV NODE_ENV=production

RUN npm run build
RUN npm prune --production

# Run
FROM base

ENV PORT=$PORT

COPY --from=build /src/.output /src/.output
# Optional, only needed if you rely on unbundled dependencies
# COPY --from=build /src/node_modules /src/node_modules

CMD [ "node", ".output/server/index.mjs" ]

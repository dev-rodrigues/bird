FROM node:20.11.1-bullseye-slim AS build

WORKDIR /install

COPY . .

RUN npm i

RUN npm run build

VOLUME /build

FROM node:20.11.1-bullseye-slim AS run

WORKDIR /app

COPY --from=build /install/build .

COPY ./package.json .
COPY ./package-lock.json .

COPY ./src/secrets  ./secrets

RUN npm i --production

CMD [ "node", "server.js" ]
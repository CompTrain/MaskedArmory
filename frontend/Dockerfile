FROM 933480341162.dkr.ecr.us-west-2.amazonaws.com/node:9.2.0 AS npm-install
WORKDIR /code
COPY package.json /code/
COPY package-lock.json /code/
RUN npm install --only=production --quiet
RUN npm prune --production
# RUN npm run test # Run unit tests here when we have them

FROM 933480341162.dkr.ecr.us-west-2.amazonaws.com/node:9.2.0 AS npm-run-build
WORKDIR /code
COPY . /code/
COPY --from=npm-install /code/node_modules /code/node_modules
ENV NODE_ENV=production
RUN npm run build

FROM 933480341162.dkr.ecr.us-west-2.amazonaws.com/assets-base:latest AS assets

FROM scratch
MAINTAINER Shane Jeffery <shanej@khaccounts.net>
WORKDIR /assets
COPY --from=assets /serve /serve
COPY --from=npm-run-build /code/dist/maskedarmory /assets/maskedarmory
ENTRYPOINT ["/serve"]

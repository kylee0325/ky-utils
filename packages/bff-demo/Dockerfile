FROM registry.cn-hangzhou.aliyuncs.com/gaodingx/docker-base-images:node-14-onbuild

# INSTALL PROJECT DEPENDCIES OUT SIDE
# APOLLO PLUGIN NEED CURL TO CREATE A `SYNC RAW REQUEST` WHEN APP STARTING
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories \
  && apk add --no-cache tzdata  curl

# RESET GLOBAL NPM REGISTRY
RUN npm config set registry https://registry-npm.gaoding.com

RUN mkdir -p /app
# COPY PROJECT FILE
COPY package.json .npmrc .yarnrc yarn.lock /app/

WORKDIR /app

# INSTALL NPM DEPENDCIES
RUN yarn

COPY . .

RUN npx tsc

EXPOSE 80

CMD ./docker-entrypoint.sh bootstrap
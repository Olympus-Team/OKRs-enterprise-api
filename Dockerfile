# FROM node:12.18.1-alpine3.9 as development

# ENV NODE_ENV=development

# WORKDIR /usr/src/app

# COPY package.json ./
# COPY yarn.lock ./

# RUN yarn install --production=false

# COPY . .

# RUN yarn build

# seperate build for production
FROM node:12.18.1-alpine3.9 as production

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install

COPY . .

RUN cp .env.example .env
#COPY --from=development /usr/src/app/dist ./dist

CMD ["yarn", "start"]
# Build stage
FROM node:lts-alpine as build-stage
LABEL MAINTAINER="Natan Vieira Do Nascimento <natanvnascimento@gmail.com>"

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM nginx:stable-alpine as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY config/nginx.conf /etc/nginx/nginx.conf
COPY entrypoint.sh entrypoint.sh

# Git info. Must be set in --build-arg (see hooks/build)
ARG GIT_BRANCH
ARG GIT_COMMIT
ENV VUE_APP_KATAN_GIT_COMMIT=${GIT_COMMIT}
ENV VUE_APP_KATAN_GIT_BRANCH=${GIT_BRANCH}

# Expose Nginx default ports
EXPOSE 80
EXPOSE 443

# Run appplication
RUN chmod +x ./entrypoint.sh
CMD ["./entrypoint.sh"]
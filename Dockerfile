FROM node:19-alpine AS build
# Set to a non-root built-in user `node`
USER node

# Create app directory (with user `node`)

RUN mkdir -p /home/node/app
WORKDIR /home/node/app

# Install app dependencies
COPY --chown=node package*.json ./
RUN echo | ls
RUN npm install
COPY --chown=node ./.env.sample ./.env
# Bundle app source code
COPY --chown=node ./ ./
RUN npm run build

#Serve with Nginx
FROM nginx:latest
COPY --from=build /home/node/app/build/ /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

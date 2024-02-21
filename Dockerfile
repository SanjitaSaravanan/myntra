# FROM nginx

# WORKDIR /app

# COPY . .

# RUN npm install

# EXPOSE 8000

# CMD ["npm","start"]

FROM node:alpine as ui-builder

WORKDIR /app

COPY . .

RUN npm install

# ARG REACT_APP_HOST_IP_ADDRESS

# ENV REACT_APP_END_POINT $REACT_APP_HOST_IP_ADDRESS

RUN npm run build

FROM nginx
COPY --from=ui-builder /app/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
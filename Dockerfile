FROM node:14.15 as node-modules-manager
WORKDIR /app
COPY ./ /app/
RUN npm install
RUN npm run build
EXPOSE 5001
CMD npm run start
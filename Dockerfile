FROM node:4.7.1

RUN npm install mongoose body-parser express

COPY mongoose-api.js /mongoose-api.js

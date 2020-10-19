FROM node:8.12.0
WORKDIR /app
COPY ./package.json .
RUN npm install
RUN ls -al
COPY ./ ./
RUN ls -al

# docker run -it wiprocure-fronetend npm run test:qt:covrage
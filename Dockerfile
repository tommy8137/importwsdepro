ARG enableApiDoc
FROM node:8.12.0-slim
WORKDIR /usr/local/wi-procurement
COPY backEnd /usr/local/wi-procurement
RUN npm install --production
RUN yarn global add db-migrate
RUN if [ $enableApiDoc=="true" ]; then npm install apidoc && mkdir apidoc && npm run apidoc; fi
RUN npm i pm2 -g
COPY frontEnd/dist /usr/local/wi-procurement/static
EXPOSE  3000
ENTRYPOINT /usr/local/bin/npm run $0 $@

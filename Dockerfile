FROM node:10

RUN git clone https://github.com/JonathonGore/knowledge-base-ui.git

WORKDIR knowledge-base-ui

RUN mv config.prod.js config.js

RUN npm install

RUN ./node_modules/.bin/next build

CMD NODE_ENV=production node server.js

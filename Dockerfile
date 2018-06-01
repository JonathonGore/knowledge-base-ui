FROM node:10

RUN git clone https://github.com/JonathonGore/knowledge-base-ui.git

WORKDIR knowledge-base-ui

RUN npm install

CMD ["npm", "start"]

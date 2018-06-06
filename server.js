const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    const server = express();

    server.get('/questions/:id', (req, res) => {
      app.render(req, res, '/questions', { id: req.params.id });
    });

    server.get('/organizations/create', (req, res) => {
      app.render(req, res, '/organizations', { create: true });
    });

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(3000, (err) => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3000');
    });
  })
  .catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
  })

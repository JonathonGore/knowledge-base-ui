const cookieParser = require('cookie-parser');
const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const isLoggedIn = (cookie) => (cookie !== undefined && cookie !== '');

app.prepare()
  .then(() => {
    const server = express();

    server.use(cookieParser());

    server.get('/', (req, res) => {
      const loggedIn = isLoggedIn(req.cookies['kb-public']);
      app.render(req, res, '/', { loggedIn });
    });

    server.get('/questions', (req, res) => {
      const loggedIn = isLoggedIn(req.cookies['kb-public']);
      if (!loggedIn) {
        app.render(req, res, '/', { loggedIn });
      }
      app.render(req, res, '/questions',  { id: '', loggedIn });
    });

    server.get('/questions/:id', (req, res) => {
      app.render(req, res, '/questions', { id: req.params.id });
    });

    server.get('/organizations/create', (req, res) => {
      app.render(req, res, '/organizations', { create: true });
    });

    server.get('/organizations/:org', (req, res) => {
      app.render(req, res, '/teams', { create: false, org: req.params.org });
    });

    server.get('/organizations/:org/create', (req, res) => {
      app.render(req, res, '/teams', { org: req.params.org, create: true });
    });

    server.get('/organizations/:org/:team', (req, res) => {
      app.render(req, res, '/teams', { team: req.params.team, org: req.params.org, create: false });
    });

    // TODO make going to /teams go to 404 page

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(3000, (err) => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3000');
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });

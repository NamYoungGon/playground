const express = require('express');
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');

const config = require('./src/config');
const database = require('./src/db/loader');
const routes = require('./src/routes/loader');

const app = express();
const server = require('http').createServer(app);

app.set('port', process.env.PORT || config.port);
app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

routes.init(app, router);

server.listen(app.get('port'), () => {
  database.init(app, config);
  console.log(`Run... port ${app.get('port')}`);
})
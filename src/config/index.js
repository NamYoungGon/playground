const routes = require('./routes');
const schemas = require('./schemas');

module.exports = {
  routes,
  port: 3000,
  db: {
    schemas,
    url: 'mongodb://admin:qwer1234@ds239911.mlab.com:39911/myplayground',
    options: {
      autoReconnect: true,
      useNewUrlParser: true
    }
  },
}
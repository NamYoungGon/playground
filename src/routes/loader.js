const loader = {};

const { routes } = require('./../config');

loader.init = (app, router) => {
  connect(app, router);
}

function connect(app, router){
  let curModule;

  routes.forEach((route, i) => {
    const { file, path, type, method } = route;

    curModule = require(file);
    router.route(path)[type](curModule[method]);
  });

  app.use('/', router);
}

module.exports = loader;
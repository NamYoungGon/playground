const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const loader = {};

loader.init = (app, config) => {
  connect(app, config);
}

function connect(app, config) {
  mongoose.Promise = global.Promise;
  mongoose.connect(config.db.url, config.db.options);
  autoIncrement.initialize(mongoose.connection);
  loader.db = mongoose.connection;

  // 데이터베이스 연결 시 동작
  loader.db.on('open', () => {
    console.log(`데이터베이스에 연결됨 : ${config.db.url}`);
  })

  createSchema(app, config);

  loader.db.on('disconnected', () => {
    console.log('데이터베이스 연결 해제');
  })

  loader.db.on('error', console.error.bind(console.log, 'mongoose 연결 에러'));
}

function createSchema(app, config) {
  let curSchema;
  let curModel;

  config.db.schemas.forEach((d, i) => {
    const { file, collection, schemaName, modelName } = d;

    curSchema = require(file).createSchema(mongoose, autoIncrement);
    curModel = mongoose.model(collection, curSchema);

    loader[schemaName] = curSchema;
    loader[modelName] = curModel;
  })

  app.set('database', loader);
}

module.exports = loader;
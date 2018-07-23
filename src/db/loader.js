const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const loader = {};

loader.init = (app, db) => {
  connect(app, db);
}

function connect(app, db) {
  const { url, options } = db;
  mongoose.connect(url, options);
  const database = loader.db = mongoose.connection;
  autoIncrement.initialize(database);

  // 데이터베이스 연결 시 동작
  database.on('open', () => {
    console.log(`데이터베이스에 연결됨 : ${url}`);
  });

  database.on('disconnected', () => {
    console.log('데이터베이스 연결 해제');
  });
  
  database.on('error', console.error.bind(console.log, 'mongoose 연결 에러'));

  createSchema(app, db);
}

function createSchema(app, { schemas }) {
  let curSchema;
  let curModel;

  schemas.forEach((d, i) => {
    const { file, collection, schemaName, modelName } = d;

    curSchema = require(file).createSchema(mongoose, autoIncrement);
    curModel = mongoose.model(collection, curSchema);

    loader[schemaName] = curSchema;
    loader[modelName] = curModel;
  })

  app.set('database', loader);
}

module.exports = loader;
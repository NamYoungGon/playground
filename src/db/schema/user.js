const crypto = require('crypto');

const Schema = {};

Schema.createSchema = function (mongoose, autoIncrement) {
  const UserSchema = mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true
    },
    nickname: {
      type: String,
      required: true,
      unique: true
    },
    hashed_password: {
      type: String
    },
    salt: {
      type: String,
      required: true
    },
    created_at: {
      type: Date,
      default: Date.now()
    },
    deleted_at: {
      type: Date
    }
  });

  UserSchema.plugin(autoIncrement.plugin, {
    model: 'UserModel',
    field: 'no',
    startAt: 0,
    incrementBy: 1
  });

  UserSchema
    .virtual('password')
    .set(function (password) {
      this.salt = this.makeSalt()
      this.hashed_password = this.encryptPassword(password)
    })
    .get(function () {

    })

  UserSchema.methods.encryptPassword = function (plainText, inSalt = this.salt) {
    if (inSalt) {
      return crypto.createHmac('sha1', inSalt).update(plainText).digest('hex')
    }
  }

  UserSchema.methods.makeSalt = function () {
    return Math.round(String((new Date().valueOf() * Math.random())))
  }

  UserSchema.methods.authenticate = function (plainText, { salt, hashed_password }) {
    return this.encryptPassword(plainText, salt) === hashed_password
  }

  UserSchema.statics.findByEmail = function (email, callback) {
    return this.findOne({ email }, callback)
}

  return UserSchema;
}

module.exports = Schema;
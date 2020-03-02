const env = require("./env.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  logging: false,
  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.comment = require("../model/comment.js")(sequelize, Sequelize);
db.user = require("../model/user.js")(sequelize, Sequelize);
db.article = require("../model/article.js")(sequelize, Sequelize);

db.user.hasMany(db.article, {
  foreignKey: "user_id"
});

db.user.hasMany(db.comment, {
  foreignKey: "user_id"
});

db.article.hasMany(db.comment, {
  foreignKey: "article_id"
});

module.exports = db;

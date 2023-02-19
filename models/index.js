// const fs = require("fs");
// const path = require("path");
// const basename = path.basename(__filename);
const Sequelize = require("sequelize");
const process = require("process");
const comment = require("./comment");
const hashtag = require("./hashtag");
const image = require("./image");
const post = require("./post");
const user = require("./user");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.Comment = require("./comment")(sequelize, Sequelize);
db.Hashtag = require("./hashtag")(sequelize, Sequelize);
db.Image = require("./image")(sequelize, Sequelize);
db.Post = require("./post")(sequelize, Sequelize);
db.User = require("./user")(sequelize, Sequelize);

// db.Comment = comment;
// db.Hashtag = hashtag;
// db.Image = image;
// db.Post = post;
// db.User = user;

// fs.readdirSync(__dirname)
//   .filter((file) => {
//     return (
//       file.indexOf(".") !== 0 &&
//       file !== basename &&
//       file.slice(-3) === ".js" &&
//       file.indexOf(".test.js") === -1
//     );
//   })
//   .forEach((file) => {
//     const model = require(path.join(__dirname, file))(
//       sequelize,
//       Sequelize.DataTypes
//     );
//     db[model.name] = model;
//   });

Object.keys(db).forEach((modelName) => {
  //model에 associate를 실행해준다
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

require("dotenv").config();
const Sequelize = require("sequelize");

// Option 1: Passing parameters separately
const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.USERNAME,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

(async () => {
  await sequelize
    .authenticate()
    .then(() => {
      console.log("working");
    })
    .catch(err => {
      console.log("not working" + err);
    });

  await sequelize.close();
})();

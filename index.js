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
  const User = sequelize.define(
    "user",
    {
      firstName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lastName: {
        type: Sequelize.STRING
      }
    },
    { timestamp: true }
  );
  // await User.sync({ force: true }).then(() => {
  //   return User.create({
  //     firstName: "John",
  //     lastName: "Hancock"
  //   });
  // });

  // Create a new user
  // await User.create({ firstName: "Jane", lastName: "Doe" }).then(jane => {
  //   console.log("Jane's auto-generated ID:", jane.id);
  // });

  // Delete everyone named "Jane"
  // await User.destroy({
  //   where: {
  //     firstName: "Jane"
  //   }
  // }).then(() => {
  //   console.log("Done");
  // });

  // Change everyone without a last name to "Doe"
  User.update(
    { lastName: "Doe" },
    {
      where: {
        lastName: null
      }
    }
  ).then(() => {
    console.log("Done");
  });

  await User.findAll().then(users => {
    console.log("All users:", JSON.stringify(users, null, 4));
  });

  await sequelize.close();
})();

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("latihan", "root", "arang123", {
  host: "127.0.0.1",
  dialect: "mysql",
  port: 3306,
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = sequelize;

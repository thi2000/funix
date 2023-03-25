const Sequelize = require("sequelize");

const sequelize = new Sequelize("node-complete", "root", "03042000thi", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;

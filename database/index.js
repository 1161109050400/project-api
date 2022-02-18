const { Sequelize } = require("sequelize/dist");

const sequelize = new Sequelize("krungthai_axa", "root", "ammber", {
  dialect: "mysql",
  host: "45.91.135.183",
  port: 3306,
});

module.exports = sequelize;

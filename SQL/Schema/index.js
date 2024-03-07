const {sequelize} = require("sequelize");

const sequelize = new Sequelize('student', 'root', '', {
    host: 'localhost',
    dialect: "mysql",
  });

  module.exports={
    sequelize,
  }
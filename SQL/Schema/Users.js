const {DataTypes} = require("sequelize");
const {sequelize} = require("./index")
//Model -- Table
const User =sequelize.define("users",{
    name:DataTypes.STRING,
    address : DataTypes.STRING,
    age:DataTypes.INTEGER,
    phone:DataTypes.BIGINT,
  });

  module.exports={
    User,
  }
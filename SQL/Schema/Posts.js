const {DataTypes} = require("sequelize");
const {sequelize} = require("./connection");
const Posts = sequelize.define("posts",{
    content: {
        type:DataTypes.STRING,
        allowNull:false,
    },
    image: {
        type:DataTypes.STRING,
        allowNull:false,

    },
    userID: {
        type:DataTypes.INTEGER,
        allowNull:false,
        refernces:{
            model:"users",
            key:"id",
        },
    },
});
module.exports={
    Posts,
}
//const {sequelize} = require("sequelize");

// const sequelize = new Sequelize('student', 'root', '', {
//     host: 'localhost',
//     dialect: "mysql",
//   });

//   module.exports={
//     sequelize,
//   }

const mysql = require("mysql2");

var mysqlConn = mysql.createConnection({
   host:'localhost',
   user:'root',
   password:'',
   database:'student'
})

var connection = mysqlConn.connect((err) =>{
  if(err){
    console.log(err);
  }
  else{
    console.log("DB Connected");
  }
})

module.exports={
  connection,
}
const sequelize = require("sequelize");

const db = new sequelize("login_system","root","",{
    dialect : "mysql"
})

db.sync({});

module.exports = db;
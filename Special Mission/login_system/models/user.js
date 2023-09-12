const sequelize= require("sequelize");
const db = require("../config/db");

const user = db.define("User", {
  email: {
    type: sequelize.STRING,
  },
  password: {
    type: sequelize.STRING,
  },
});

module.exports = user;

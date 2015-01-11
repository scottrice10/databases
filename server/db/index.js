var Sequelize = require("sequelize");

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".
exports.chatDatabase = new Sequelize('chat', 'root', '', {
  port: '3306',
  dialect: 'mysql'
});

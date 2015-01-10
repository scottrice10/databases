var chatDatabase = require('../db').chatDatabase;
var Sequelize = require("sequelize");

exports.users = chatDatabase.define("users", {
  name: Sequelize.INTEGER,
  createdAt: {
    type: Sequelize.DATE,
    field: "created_at"
  },
  updatedAt: {
    type: Sequelize.DATE,
    field: "created_at"
  }
});

exports.rooms = chatDatabase.define("rooms", {
  name: Sequelize.INTEGER,
  createdAt: {
    type: Sequelize.DATE,
    field: "created_at"
  },
  updatedAt: {
    type: Sequelize.DATE,
    field: "created_at"
  }
});

exports.messages = chatDatabase.define("messages", {
  text: Sequelize.STRING,
  userId: {
    type: Sequelize.INTEGER,
    field: "user_id"
  },
  roomId: {
    type: Sequelize.INTEGER,
    field: "room_id"
  },
  createdAt: {
    type: Sequelize.DATE,
    field: "created_at"
  },
  updatedAt: {
    type: Sequelize.DATE,
    field: "created_at"
  }
});

//One to many relationship from user to messages
exports.messages.belongsTo(exports.users);
exports.users.hasMany(exports.messages);

//One to many relationship from room to messages
exports.messages.belongsTo(exports.rooms);
exports.rooms.hasMany(exports.messages);

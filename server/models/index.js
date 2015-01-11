var Sequelize = require("sequelize");

exports.chatDatabase = require('../db').chatDatabase;

exports.users = exports.chatDatabase.define("users", {
  name: Sequelize.INTEGER,
  createdAt: {
    type: Sequelize.DATE,
    field: "created_at"
  },
  updatedAt: {
    type: Sequelize.DATE,
    field: "updated_at"
  }
});

exports.rooms = exports.chatDatabase.define("rooms", {
  name: Sequelize.INTEGER,
  createdAt: {
    type: Sequelize.DATE,
    field: "created_at"
  },
  updatedAt: {
    type: Sequelize.DATE,
    field: "updated_at"
  }
});

exports.messages = exports.chatDatabase.define("messages", {
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
    field: "updated_at"
  }
});

//One to many relationship from user to messages
exports.messages.belongsTo(exports.users);
exports.users.hasMany(exports.messages);

//One to many relationship from room to messages
exports.messages.belongsTo(exports.rooms);
exports.rooms.hasMany(exports.messages);

exports.messages.sync();
exports.users.sync();
exports.rooms.sync();

exports.chatDatabase
  .authenticate()
  .complete(function(err) {
    // Even if we didn't define any foreign key or something else,
    // instances of Target will have a column SourceId!
    if (!!err) {
      console.log('Unable to connect to the database:', err)
    } else {
      console.log('Connection has been established successfully.')
    }
  });

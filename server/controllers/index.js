var models = require('../models');
var Promise = require('bluebird');

module.exports = {
  messages: {
    get: function(req, res) {
      models.messages.findAll({})
        .success(function(messages) {
          res.send(messages);
        })
        .error(function(err) {
          console.log(err);
        });
    }, // a function which handles a get request for all messages
    post: function(req, res) {
        var getUser = function() {
          models.users.findOrCreate({
              name: req.body.username
            })
            .success(function(user) {
              getRooms(user);
            })
            .error(function(err) {
              console.log(err);
            });
        };
        getUser();

        var getRooms = function(user) {
          models.rooms.findOrCreate({
              name: req.body.roomname
            })
            .success(function(room) {
              insertMessages(user, room);
            })
            .error(function(err) {
              console.log(err);
            });
        };

        var insertMessages = function(user, room) {
          models.rooms.create({
              text: req.body.text,
              user: user.name,
              room: room.name
            })
            .success(function(messages) {
              res.send(messages);
            })
            .error(function(err) {
              console.log(err);
            });
        };

        // var message = models.messages.build({
        //   text: req.body.text
        // });

        // var room = models.rooms.findOrCreate({
        //   name: req.body.roomname
        // });

        // var user = models.users.findOrCreate({
        //   name: req.body.username
        // });

        // message.setRooms(room);
        // message.setUsers(user);

        // message.save();
      } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function(req, res) {
      models.users.findAll({})
        .success(function(users) {
          res.send(users);
        })
        .error(function(err) {
          console.log(err);
        });
    },
    post: function(req, res) {
      models.users.findOrCreate({
          name: req.body.username
        })
        .success(function(user) {
          res.send(user);
        })
        .error(function(err) {
          console.log(err);
        });
    }
  },

  rooms: {
    // Ditto as above
    get: function(req, res) {
      models.rooms.findAll({})
        .success(function(rooms) {
          res.send(rooms);
        })
        .error(function(err) {
          console.log(err);
        });
    },
    post: function(req, res) {
      models.rooms.findOrCreate({
          name: req.body.roomname
        })
        .success(function(room) {
          res.send(room);
        })
        .error(function(err) {
          console.log(err);
        });
    }
  }
};

var models = require('../models');
var Promise = require('bluebird');

module.exports = {
  messages: {
    get: function(req, res) {
      models.messages.findAll({})
        .then(function(messages) {
          res.send({
            results: messages
          });
        })
        .fail(function(err) {
          console.log(err);
        });
    }, // a function which handles a get request for all messages
    post: function(req, res) {
        var getUser = function() {
          models.users.findOrCreate({
            where: {
              name: req.body.username
            },
            defaults: {
              //properties to be created
            }
          }).then(function(user) {
            getRooms(user);
          }).fail(function(err) {
            console.log('Error occured', err);
          });
        };
        getUser();

        var getRooms = function(user) {
          models.rooms.findOrCreate({
            where: {
              name: req.body.roomname
            },
            defaults: {
              //properties to be created
            }
          }).then(function(room) {
            insertMessages(user, room);
          }).fail(function(err) {
            console.log('Error occured', err);
          });
        };

        var insertMessages = function(user, room) {
          models.messages.create({
            text: req.body.text,
            userId: user.id,
            roomId: room.id
          }).then(function(message) {
            res.send(message);
          }).fail(function(err) {
            console.log('Error occured', err);
          });
        };
      } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function(req, res) {
      models.users.findOrCreate({
        where: {
          name: req.body.username
        },
        defaults: {
          //properties to be created
        }
      }).then(function(user) {
        var created = user[1];
        user = user[0];
        console.log(user.values);
      }).fail(function(err) {
        console.log('Error occured', err);
      });
    },
    post: function(req, res) {
      models.users.findOrCreate({
        where: {
          name: req.body.username
        },
        defaults: {
          //properties to be created
        }
      }).then(function(user) {
        var created = user[1];
        user = user[0];
        console.log(user.values);
      }).fail(function(err) {
        console.log('Error occured', err);
      });
    }
  },

  rooms: {
    // Ditto as above
    get: function(req, res) {
      models.rooms.findOrCreate({
        where: {
          name: req.body.roomname
        },
        defaults: {
          //properties to be created
        }
      }).then(function(room) {
        var created = room[1];
        room = room[0];
        console.log(room.values);
      }).fail(function(err) {
        console.log('Error occured', err);
      });
    },
    post: function(req, res) {
      models.rooms.findOrCreate({
        where: {
          name: req.body.roomname
        },
        defaults: {
          //properties to be created
        }
      }).then(function(room) {
        var created = room[1];
        room = room[0];
        console.log(room.values);
      }).fail(function(err) {
        console.log('Error occured', err);
      });
    }
  }
};

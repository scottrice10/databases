var models = require('../models');

module.exports = {
  messages: {
    get: function(req, res) {
      models.messages.findAll({})
        .complete(function(err, messages) {
          if(!!err) {
            console.log(err);
          } else if(!messages) {
            res.send({results: []});
          } else {
            res.send({
              results: messages
            });
          }
        })
    }, // a function which handles a get request for all messages
    post: function(req, res) {
      var newUser;

      models.users.findOrCreate({
        where: {
          name: req.body.username
        }
      }).complete(function(err, user) {
        if(!!err) {
          console.log('Error occured', err);
        } else {
          console.log("user", user);
          newUser = user[0].dataValues;
          models.rooms.findOrCreate({
            where: {
              name: req.body.roomname
            }
          }).complete(function(err, room) {
            if(!!err) {
              console.log('Error occured', err);
            } else {
              room = room[0].dataValues;
              models.messages.create({
                text: req.body.text,
                userId: newUser.id,
                roomId: room.id
              }).complete(function(err, message) {
                if(!!err) {
                  console.log('Error occured', err);
                } else {
                  message = message.dataValues;
                  console.log("Message posted:", message);
                  res.send(message);
                }
              });
            }
          });
        }
      });
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
      }).complete(function(err, user) {
        if(!!err) {
          console.log(err);
        } else if(!user) {
          res.send([]);
        } else {
          res.send(user);
        }
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
      }).complete(function(err, user) {
        if(!!err) {
          console.log('Error occured', err);
        } else {
          user = user[0];
          console.log("Message posted:", user.dataValues);
          res.send(user);
        }
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
      }).complete(function(err, room) {
        if(!!err) {
          console.log(err);
        } else if(!room) {
          res.send([]);
        } else {
          res.send(room);
        }
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
      }).complete(function(err, room) {
        if(!!err) {
          console.log('Error occured', err);
        } else {
          room = room[0];
          console.log("Room posted", room.dataValues);
          res.send(room);
        }
      });
    }
  }
};

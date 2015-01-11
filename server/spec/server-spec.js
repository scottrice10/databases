/* You'll need to have MySQL running and your Node server running
 * for these tests to pass. */

var Sequelize = require("sequelize");
var request = require("request"); // You might need to npm install the request module!
var expect = require('../../node_modules/chai/chai').expect;
var models = require('../models');

describe("Persistent Node Chat Server", function() {
  beforeEach(function(done) {
    /* Empty the db table before each test so that multiple tests
     * (or repeated runs of the tests) won't screw each other up: */
    done();
  });

  it("Should insert posted messages to the DB", function(done) {
    // Post the user to the chat server.
    request({
      method: "POST",
      uri: "http://127.0.0.1:3000/classes/users",
      json: {
        username: "Valjean"
      }
    }, function() {
      // Post a message to the node chat server:
      request({
        method: "POST",
        uri: "http://127.0.0.1:3000/classes/messages",
        json: {
          username: "Valjean",
          text: "In mercy's name, three days is all I need.",
          roomname: "Hello"
        }
      }, function() {
        // Now if we look in the database, we should find the
        // posted message there.

        models.messages.findAll({}).complete(function(err, results) {
          if(!!err) {
            console.log(err);
          }

          models.messages.destroy({
            where: {
              text: "In mercy's name, three days is all I need."
            }
          }).complete(function(err) {
            if(!!err) {
              console.log(err);
            }

            models.users.destroy({
              where: {
                name: "Valjean"
              }
            }).complete(function(err) {
              if(!!err) {
                console.log(err);
              }

              models.rooms.destroy({
                where: {
                  name: "Hello"
                }
              }).complete(function(err) {
                if(!!err) {
                  console.log(err);
                }

                // Should have one result:
                expect(results.length).to.equal(1);
                expect(results[0].text).to.equal("In mercy's name, three days is all I need.");
                done();
              })
            })
          });
        });
      })
    })
  });


  it("Should output all messages from the DB", function(done) {
    // Let's insert a message into the db
    var userId;
    models.users.findOrCreate({
      where: {
        name: "Scott"
      },
      defaults: {
        //properties to be created
      }
    }).complete(function(err, user) {
      user = user[0].dataValues;
      userId = user.id;
      models.rooms.findOrCreate({
        where: {
          name: "4chan"
        },
        defaults: {
          //properties to be created
        }
      }).complete(function(err, room) {
        room = room[0].dataValues;
        models.messages.create({
          text: "Men like you can never change!",
          userId: userId,
          roomId: room.id
        }).complete(function() {
          models.messages.findAll({}).complete(function(err, results) {
            // Now query the Node chat server and see if it returns
            // the message we just inserted:
            request({
              method: "GET",
              uri: "http://127.0.0.1:3000/classes/messages"
            }, function(error, response, body) {
              if(error) {
                console.log(error);
              } else {
                var messageLog = JSON.parse(body);

                models.messages.destroy({
                  where: {
                    text: "Men like you can never change!"
                  }
                }).complete(function(err) {
                  if(!!err) {
                    console.log(err);
                  }

                  models.users.destroy({
                    where: {
                      name: "Scott"
                    }
                  }).complete(function(err) {
                    if(!!err) {
                      console.log(err);
                    }

                    models.rooms.destroy({
                      where: {
                        name: "4chan"
                      }
                    }).complete(function(err) {
                      if(!!err) {
                        console.log(err);
                      }
                      expect(messageLog.results[0].text).to.equal("Men like you can never change!");
                      done();
                    })
                  })
                });
              }
            });
          });
        })
      });
    });
  });
});

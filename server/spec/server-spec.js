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
    // models.messages.destroy({
    //   truncate: true
    // }).then(function(){
    //   models.rooms.destroy({
    //     truncate: true
    //   });
    // }).then(function(){
    //   models.users.destroy({
    //     truncate: true
    //   });
    // });
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
          message: "In mercy's name, three days is all I need.",
          roomname: "Hello"
        }
      }, function() {
        // Now if we look in the database, we should find the
        // posted message there.

        models.messages.findAll({}).then(function(results) {
          // Should have one result:
          expect(results.length).to.equal(1);

          expect(results[0].text).to.equal("In mercy's name, three days is all I need.");

          done();
        });
      });
    });
  });


  it("Should output all messages from the DB", function(done) {
    // Let's insert a message into the db
    models.messages.create({
      text: "Men like you can never change!",
      roomname: "main"
    });

    models.messages.findAll({}).then(function(results) {
      // Now query the Node chat server and see if it returns
      // the message we just inserted:
      request("http://127.0.0.1:3000/classes/messages", function(error, response, body) {
        var messageLog = JSON.parse(body);
        expect(messageLog[0].text).to.equal("Men like you can never change!");
        expect(messageLog[0].roomname).to.equal("main");
        done();
      });
    });
  });
});

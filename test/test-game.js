'use strict';
var chai = require('chai');
var sinon = require('sinon');
var expect = chai.expect;
chai.should();
chai.use(require('sinon-chai'));

var io = require('socket.io-client');

var port = 5000;
var socketUrl = 'http://0.0.0.0:' + port;
require('../api/game')(port);

describe('echo', function () {

  var options = {
    transports: ['websocket'],
    'force new connection': true
  };

  it('echos message', function (done) {
    var client = io.connect(socketUrl, options);
    var sentMessage = 'Hello World';

    client.once('connect', function () {
      client.once('echo', function (message) {
        expect(message).to.equal(sentMessage);

        client.disconnect();
        done();
      });

    });
    client.emit('echo', sentMessage);
  });

});

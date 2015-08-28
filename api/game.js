var socketio = require('socket.io');

function startSockets(port) {
  var io = socketio.listen(port || 5000);

  io.sockets.on('connection', function (socket) {
    socket.on('echo', function (msg, callback) {
      callback = callback || function () {};
      socket.emit('echo', msg);
      callback(null, 'Done.');
    });
  });

  return io;
}

module.exports = function (port) {
  return {
    io: startSockets(port)
  };
}

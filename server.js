const io = require('socket.io')(9090);

io.on('connection', (socket) => {
  const userId = socket.handshake.query.userId;
  socket.join(userId);

  socket.on('add-user', (userInfo) => {
    userInfo.forEach((user) => {
      socket.emit('receive-user', userInfo);
    });
  });
});

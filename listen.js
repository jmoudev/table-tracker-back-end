const app = require('./app');
const server = require('http').Server(app);
const io = require('socket.io')(server, { cors: { origin: '*' } });

const PORT = 9090;

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

io.on('connection', (socket) => {
  socket.on('new-order', (order) => {
    io.emit('order', order);
  });
});

const app = require('./app');
// const http = require('http').Server(app);
// const io = require('socket.io')(http);

const PORT = 9090;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

// io.on('connection', (socket) => {
//   socket.on('new-order', (order) => {
//     io.emit('order', order);
//   });
// });

const express = require('express');
const app = express();
const path = require('path');

const socket = require('socket.io');
const server = app.listen(8000, () => {
  console.log('Server is running on Port:', 8000);
});

const io = socket(server);

const users = [];

io.on('connection', (socket) => {
  console.log('New client! Its id – ' + socket.id);

  socket.on('join', (userName) => {
    
    users.push({ name: userName, id: socket.id });
    io.emit('userList', users);
    socket.broadcast.emit('newUser', userName);

    console.log(`${userName} joined the chat.`);
  });

  socket.on('message', (message) => {
    console.log('Oh, I\'ve got something from ' + socket.id);
    messages.push(message);
    socket.broadcast.emit('message', message);
  });

  socket.on('disconnect', () => {
    const disconnectedUser = users.find((user) => user.id === socket.id);
    if (disconnectedUser) {
      users.splice(users.indexOf(disconnectedUser), 1);
      io.emit('userList', users);
      io.emit('removeUser', disconnectedUser.name);

      console.log(`${disconnectedUser.name} left the chat.`);
    }

    console.log('Oh, socket ' + socket.id + ' has left');
  });

  console.log('I\'ve added a listener on message and disconnect events \n');
});

const messages = [];

app.use(express.static('client'));
app.use(express.json());

app.get('/messages', (req, res) => {
  res.json(messages);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

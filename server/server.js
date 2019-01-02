// use path so we cab refer to paths outside our directory easier (or we have to out and in)
const path = require('path');
const http = require('http');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const express = require('express');
const socketIO = require('socket.io');
const app = express();
const server = http.createServer(app); // We need this as we attach this variable to the io constructor
const io = socketIO(server);

// Local imports
const {genMessage} = require('./utils/message');

// Configure express static middleware, to serve up the public folder
// https://expressjs.com/en/starter/static-files.html
// entry point is index.html, so it goes automatically there.
app.use(express.static(publicPath));

// Register an event via socketIO; socket argument is the individual socket that is connected to which ever client
// We NEVER attach custom events to IO; only attach them to the io arg (socket)
io.on('connection', (socket) => {
    // Every time a user connects, this gets printed
    console.log('New User Connected');

    // Emit an event to this socket
    socket.emit('newMessage', genMessage('Admin', 'Welcome to the chat app!'));

    // Broadcast sends an event to EVERYBODY except for this socket
    socket.broadcast.emit('newMessage', genMessage('Admin', 'New User Joined!'));

    socket.on('disconnect', () => {
        console.log('User Disconnected');
    });

    // Listen to a custom event (from client)
    socket.on('createMessage', function (message, callback) {
        console.log('received message', message);
        // Emit our custom event; Client is listening...
        io.emit('newMessage', genMessage(`${message.from} (${socket.id})`, message.msg));

        // We can send databack via this callback
        callback('This is sent from the server');
    });
});

server.listen(port, () => {
    console.log(`Listening on ${port}`);
});

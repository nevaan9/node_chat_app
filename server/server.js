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
const {genMessage, genLocMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

// Create a users array
const users = new Users();

// Configure express static middleware, to serve up the public folder
// https://expressjs.com/en/starter/static-files.html
// entry point is chat.html, so it goes automatically there.
app.use(express.static(publicPath));

// Register an event via socketIO; socket argument is the individual socket that is connected to which ever client
// We NEVER attach custom events to IO; only attach them to the io arg (socket)
io.on('connection', (socket) => {
    // Join a room
    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room name are required!')
        }

        // Make the current socket join a room
        socket.join(params.room);
        // Add user to the users array; first remove from other rooms.
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        // Send the users list to the individuals in that room
        io.to(params.room).emit('updateUsersList', users.getUserList(params.room));
        // Broadcast sends an event to EVERYBODY except for this socket, but user to() just to target EVERYBODY IN THE ROOM
        socket.broadcast.to(params.room).emit('newMessage', genMessage('Admin', `${params.name} joined the room!`));
        // Emit an event to this users socket
        socket.emit('newMessage', genMessage('Admin', 'Welcome to the chat app!'));
        callback()
    });

    // Listen to a custom event (from client)
    socket.on('createMessage', function (message, callback) {
        // find the user who sent the message
        const user = users.getUser(socket.id);
        // Validate
        if (user && isRealString(message.msg)) {
            // Emit our custom event; Client is listening...
            io.to(user.room).emit('newMessage', genMessage(`${user.name}`, message.msg));
        }
        // We can send databack via this callback
        callback('This is sent from the server');
    });

    // Listen to when the share location button is created.
    socket.on('createLocationMessage', function (message, callback) {
        const user = users.getUser(socket.id);

        if (user) {
            io.to(user.room).emit('newLocationMessage', genLocMessage(`${user.name}`, message.lat, message.lng));
        }
    });

    // When a user leaves
    socket.on('disconnect', () => {
        let user = users.removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('updateUsersList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', genMessage('Admin', `${user.name} left the room!`));
        }
    });
});

server.listen(port, () => {
    console.log(`Listening on ${port}`);
});

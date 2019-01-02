// We get this from the above script tag;
let socket = io();

// 'connect' is a built in event
socket.on('connect', function () {
    console.log('Connected to server!');
});

// Emit a custom event; Server is listening
socket.emit('createMessage', {
    to: 'Devin De Silva',
    from: 'Nevaan Perera',
    msg: 'Hello World!',
    createdAt: 1234
});

// Listening to custom event. Server is emiting it.
socket.on('newMessage', function (message) {
    console.log(message);
});

socket.on('disconnect', function () {
    console.log('Disconnected from server!');
});

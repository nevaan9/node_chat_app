// We get this from the above script tag;
let socket = io();

// 'connect' is a built in event
socket.on('connect', function () {
    console.log('Connected to server!');
});

// Listening to custom event. Server is emiting it.
socket.on('newMessage', function (message) {
    console.log(`New Message from ${message.from}: ${message.msg}`);
});

socket.on('disconnect', function () {
    console.log('Disconnected from server!');
});

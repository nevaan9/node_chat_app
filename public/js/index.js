// We get this from the above script tag;
let socket = io();

// 'connect' is a built in event
socket.on('connect', function () {
    console.log('Connected to server!');
});

// Listening to custom event. Server is emiting it.
socket.on('newMessage', function (message) {
    console.log(`New Message from ${message.from}: ${message.msg}`);
    let li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.msg}`);
    jQuery('#messages').append(li);
});

socket.on('disconnect', function () {
    console.log('Disconnected from server!');
});

// A jQuery function to submit form entries.
jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'User',
        msg: jQuery('[name=message]').val()
    }, function (data) {
        console.log(`This was sent from the server: ${data}`);
    });
    jQuery('#message-value').val('');
});
